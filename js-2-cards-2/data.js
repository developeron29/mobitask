
var Composer = function() {
	var  noder = [],
	html = [];
	return {
		extractXML : function(node) {
			for(var i=0; i < node.length ; i++) {
					document.getElementsByClassName('header')[i].innerHTML = '<h1>'+node[i].getAttribute('title')+'</h1>';
					document.getElementsByClassName('ui-content')[i].innerHTML = node[i].innerHTML;
			}
	
		}

	};
};

var helper = new Composer();

function bodyLoad() {
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

	xmlhttp.open("GET","data.xml",true);
	xmlhttp.send();

}




















