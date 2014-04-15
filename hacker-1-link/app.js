var request = require('request'),
cheerio = require('cheerio'),
async = require('async'),
links = [],
broken = [],
linkNo = 0,
brokenNo = 0;

async.waterfall([ // Async helps in control-flow during asynchronous requests

	function (callback){
		request('http://www.mobileacademy.com/', function (error, response, body) { // Requests Mobileacademy's website
	if(!error && response.statusCode == 200) {
		$ = cheerio.load(body);
		$('a').each(function () { //gets <a> tags
			var link = $(this);
			linkNo++;
			links.push(link.attr('href')); //Gets links
		});
		callback(null,links,linkNo);
		
	}
  });
},
function (links,linkNo, callback) {
	brokenNo = 0;
	for(var i=0;i<links.length;i++){
		request(links[i], function (error, response, body) { // Calls individual links to check if broken

				if(response && response.statusCode != 200) { //Checks for broken links
					brokenNo++; 
					broken.push(links[i]); // appends broken links
				}
			});
	}
		callback(null,links,linkNo,brokenNo,broken)
	

}, 
function (links,linkNo,brokenNo,broken,callback) {

	console.log('Total Links: '+linkNo);
		console.log('Broken Links: '+brokenNo+'\n');
		console.log('Link,Broken');
		for(var i = 0; i < broken.length; i++) {
			console.log(broken[i],'True'); // Prints broken links
			var index = links.indexOf(broken[i]);
			if(index > -1) {
				links.splice(index, 1); //Removes broken links from all links
			}
		} 
		for(var j= 0 ; j < links.length; j++){
			console.log(links[j],'False'); // Prints non-broken links
		}
		callback(null,'done');
}

]);





		