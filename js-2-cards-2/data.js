
var Composer = function() { // Object to extract data from xml and add it to html.
	var  noder = [],
	html = [];
	return {
		extractXML : function(node) {
			for(var i=0; i < node.length ; i++) { //fills in html
					document.getElementsByClassName('header')[i].innerHTML = '<h1>'+node[i].getAttribute('title')+'</h1>';
					document.getElementsByClassName('ui-content')[i].innerHTML = node[i].innerHTML;
			}
	
		}

	};
};

var helper = new Composer();

function bodyLoad() { //loads on body load
	var xmlhttp;
	if(window.XMLHttpRequest) 
	{
		xmlhttp = new XMLHttpRequest();
	}
	else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			var test = xmlhttp.responseXML,
			node = test.getElementsByTagName('card');
			helper.extractXML(node); 
		}
	}

	xmlhttp.open("GET","data.xml",true); // extract data from xml
	xmlhttp.send();

}




















