'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _facets = require('./facets');

var _facets2 = _interopRequireDefault(_facets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scrape = require('html-metadata');

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	// mount the facets resource
	api.use('/facets', (0, _facets2.default)({ config: config, db: db }));

	// perhaps expose some API metadata at the root
	api.get('/getdata', function (req, res) {
		var urlParam = req.query.url;

		//verify that the url is legal
		if (urlParam.substring(0, 4) != "http") {
			//fix it if its not
			urlParam = "http://" + urlParam;
		}

		scrape(urlParam, function (error, metadata) {
			console.log(metadata);
			res.json({ metadata: metadata });
		});
	});

	return api;
};
//# sourceMappingURL=index.js.map