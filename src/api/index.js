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

		//verify that the url is legal
		if(urlParam.substring(0,4) != "http"){
			//fix it if its not
			urlParam = "http://" + urlParam;
		}

		scrape(urlParam, function(error, metadata){
			console.log(metadata);
			res.json({ metadata });
		});
		
	});

	return api;
}
