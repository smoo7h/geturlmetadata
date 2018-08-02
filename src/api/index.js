import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
var scrape = require('html-metadata');

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/getdata', (req, res) => {
		var urlParam = req.query.url;
		scrape(urlParam, function(error, metadata){
			console.log(metadata);
			res.json({ metadata });
		});
		
	});

	return api;
}
