const core = require('@actions/core');
const github = require('@actions/github');

const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery({
    projectId: core.getInput('project-id'),
    credentials: core.getInput('service-account-key')
});
let tableResponse = '';

const query = core.getInput('query');

bigquery.createQueryStream(query)
    .on('error', function (err) {
        core.setFailed(err);
    })
    .on('data', function (row) {
        if (tableResponse === '') {
            Object.keys(row).forEach((key, index) => {
                tableResponse += `| ${key} `;
            });
            tableResponse += ` | 
`
            Object.keys(row).forEach((key, index) => {
                tableResponse += "| --- ";
            });
            tableResponse += ` | 
`
        }
        Object.keys(row).forEach((key, index) => {
            tableResponse += `| ${row[key]} `;
        });
        tableResponse += ` | 
`
    })
    .on('end', function () {
        core.setOutput("table", tableResponse);
    });

bigquery.createQueryStream(query)
    .on('data', function (row) {
        this.end();
    });