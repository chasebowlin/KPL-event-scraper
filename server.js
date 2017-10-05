var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();



app.get('/', function(req, res){



	//the URL is the kenosha public library's home page
	//here a user can find up coming events and the hours
	//for the library

	url = 'https://www.mykpl.info/';




	//structure of the request call
	// The callback function takes 3 parameters, an error, response status code and the html
	request(url, function(error, response, html){

		 // First we'll check to make sure no errors occurred when making the request
		 if(!error) {

		 	console.log("successfully connected to the KPL website \n");

		 	//next use the cheerio library on the returned html
		 	var $ = cheerio.load(html);

		 	//create two arrays. the first will hold all the 
		 	//hours for the library. the second will hold all
		 	//the current and up coming events
		 	var hours;
		 	var events = {};


		 	//the closest element to the paragraph with the
		 	//times for the 
		 	$('.address').filter(function() {
		 		var data = $(this);
		 		
		 		hours = data.siblings().text();
		 		console.log(hours);
		 		console.log('\n');

		 	})


		 	//send the hours to the broswer
		 	res.send(hours);
		 }

		

	}) ;
})


app.listen('8080');

console.log('Connect to port 8080 \n');

exports = module.exports = app;