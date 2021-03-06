var request = require('request'),
cheerio = require('cheerio'),
async = require('async'),
links = [], // Stores total links
true1 = [], // Stores correct links
broken = [], // Stores broken links
trueno = 0, // stores number of correct links
linkNo = 0, // Stores total link number
brokenNo = 0; //Stores number of broken links.

async.waterfall([ // Async helps in control-flow during asynchronous requests

	function (callback){
		request('http://www.mobileacademy.com/', function (error, response, body) { // Requests Mobileacademy's website
	if(!error && response.statusCode == 200) {
		$ = cheerio.load(body);
		$('a').each(function () { //gets <a> tags
			var link = $(this);
			linkNo++;
			links.push(link.attr('href')); //Gets links;
		});
		callback(null,links,linkNo);
		
	}
  });
},
function (links,linkNo, callback) {
	brokenNo = 0;
	async.each(links, function (link, callback) {
		request(link, function (error, response, body) { // Calls individual links to check if broken
				if(response && response.statusCode != 200) { //Checks for broken links
					brokenNo++; 
					broken.push(link); // appends broken links	
				} else {
					trueno++;
					true1.push(link);
					//if(response)	console.log(link,response.statusCode); - Prints status code of visited links
				}
				callback();
			});
	}, function (err) {
		callback(null,links,linkNo,true1,trueno,brokenNo,broken);
	});	

}, 
function (links,linkNo,true1,trueno,brokenNo,broken,callback) {
	console.log('Total Links: '+linkNo); 
		console.log('Broken Links: '+brokenNo);
		console.log('Non-broken Links: '+trueno+'\n');
		console.log('Link,Broken');
		for(var i=0; i < brokenNo; i++){ 
			console.log(broken[i],',True'); // Prints broken links to console
		}
		for(var j=0; j < trueno; j++) {
			console.log(true1[j],',False'); //Prints non-broken links to console
		}
		callback(null,'done');
}

]);





		