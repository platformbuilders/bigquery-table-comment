/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 521:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 755:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 641:
/***/ ((module) => {

module.exports = eval("require")("@google-cloud/bigquery");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(521);
const github = __nccwpck_require__(755);

const { BigQuery } = __nccwpck_require__(641);
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
})();

module.exports = __webpack_exports__;
/******/ })()
;