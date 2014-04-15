
var Composer = function() {
	var  noder = [],
	html = [];
	return {
		extractXML : function(node) {
			for(var i=0; i < node.length ; i++) {
				noder.push({ title: node[i].getAttribute('title'), html: node[i].innerHTML });
			}
			//console.log(noder);

			this.generateHTML('pageone',noder[0].title,noder[0].html,'','pagetwo');
			this.generateHTML('pagetwo',noder[1].title,noder[1].html,'pageone','pagethree');
			this.generateHTML('pagethree',noder[2].title,noder[2].html,'pagetwo','');
			var r = html.join('');
			//r += '';
			return r;
		},
		generateHTML : function (id,heading,content,prev,next) {
			var x = '<div data-role="page" id="'+id+'">'+
					'<div data-role="header">'+	
						'<h1>'+heading+'</h1>'+
					'</div>'+
					'<div data-role="main" class="ui-content">'+content+'</div>'+
					'<div data-role="footer">'+
					'<a href="#'+prev+'" data-transition="slide">Prev</a>'+
					'<a href="#'+next+'" data-transition="slide">Next</a>'+
					'</div></div>';
					html.push(x);

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
			var a = helper.extractXML(node);
			callNew(a);
			 
			//$('<div>').append(a);
			//document.write(a);
		}
	}

	xmlhttp.open("GET","data.xml",true);
	xmlhttp.send();

}

function callNew (a) {

	document.getElementById('myDiv').innerHTML += a.toString();
	//	$('#myDiv').append(a.toString());
			console.log(a);
	
}


















