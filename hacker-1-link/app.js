var request = require('request'),
cheerio = require('cheerio'),
async = require('async'),
links = [],
broken = [],
true1 = [],
linkNo = 0,
brokenNo = 0;

async.waterfall([

	function (callback){
		request('http://www.mobileacademy.com/', function (error, response, body) {
	if(!error && response.statusCode == 200) {
		$ = cheerio.load(body);
		$('a').each(function () {
			var link = $(this);
			linkNo++;
			links.push(link.attr('href'));
		});
		callback(null,links,linkNo);
		
	}
  });
},
function (links,linkNo, callback) {
	brokenNo = 0;
	for(var i=0;i<links.length;i++){
		request(links[i], function (error, response, body) {

				if(response && response.statusCode != 200) {
					brokenNo++;
					broken.push(links[i]);
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
			console.log(broken[i],'True');
			var index = links.indexOf(broken[i]);
			if(index > -1) {
				links.splice(index, 1);
			}
		} 
		for(var j= 0 ; j < links.length; j++){
			console.log(links[j],'False');
		}
		callback(null,'done');
}

]);





		