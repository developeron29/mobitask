var Converter = function () {
	var x = '',
	y = '',
	eData = [] ,
	eBrand = [],
	device = [],
	visits = 0,
	purchases = 0;
	return {
		osOptions : function (data) {
				x = '<option>all</option>';
				for(var i =0 ; i < data.length ; i++) {
					eData[data[i].os] = data[i];
				 	x += '<option>'+data[i].os+'</option>'; 	
				}
				return x;
		},
		brandOptions : function (input) {
			y ='';
			if(input == 'all') {
				for (var j in eData) {
					this.optionateBrands(eData[j]);
				}
			}
			else
			{
					this.optionateBrands(eData[input]);
			}
			if(y != ''){
			y += '<option>all</option>';
			}
			return y;
		},
		optionateBrands : function (input) {
			if(input.children) {
						for (var  k = 0 ; k < input.children.length; k++) {
							
							var re = new RegExp('<option>'+input.children[k].brand+'</option>','g');
							if(!re.test(y))
							{ 
								y += '<option>'+input.children[k].brand+'</option>';
							}

						}
						
					}
		},
		fewCalculations : function(inp1,inp2) {
			visits = 0;
			purchases = 0;
			device = [];
			if(inp1 != 'all') {
				var test = eData[inp1];
				this.calculationHelper1(inp1,test,inp2);

			} else if (inp1 == 'all') {

				for(var i in eData) {
					var test = eData[i];
					this.calculationHelper1(inp1,test,inp2);
				}
			}

			return  {v: visits,p: purchases,d: device};
		},
		calculationHelper1 : function (inp1,test,inp2) {
			if(test.children) {
					for(var i=0; i < test.children.length; i++) {
						if(test.children[i].brand == inp2){
							this.calculationHelper2(test.children[i],inp2);
						}
						else if (inp2 == 'all')
						{
							this.calculationHelper2(test.children[i],inp2);
						}
					}
				}
				else if(test.os == inp1 || (inp1 == 'all' && inp2 == 'all') ){
							visits += test.visits;
							purchases += test.purchases;
				}
		},
		calculationHelper2 : function (inp,inp2) {
			var test1 = inp.children;
							if(test1){
								for(var j =0; j < test1.length ; j++) {
									device.push(test1[j].device);
									visits += test1[j].visits;
									purchases += test1[j].purchases;
								}
							}
							else if(inp.brand == inp2 || inp2 == 'all'){ 
									visits += inp.visits;
									purchases += inp.purchases;
							}
		}
	}
};

var helper = new Converter();

function loadDoc() {
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
			var data = JSON.parse(xmlhttp.responseText);
			document.getElementsByName('os')[0].innerHTML = helper.osOptions(data);
			loadBrand();
			findConv();
		}
	}

	xmlhttp.open("GET","data.json",true);
	xmlhttp.send();
}

function loadBrand () {
	document.getElementsByName('brand')[0].innerHTML = helper.brandOptions(document.getElementsByName('os')[0].value);
}

function findConv () {
	var os = document.getElementsByName('os')[0].value;
	var brand = document.getElementsByName('brand')[0].value;
	var json = helper.fewCalculations(os,brand);
	var a = document.getElementsByTagName('span');
	for(var i=0;i<a.length;i++){
		var b = a[i].getAttribute('data-value');
		if(b == 'visits'){
			a[i].innerHTML = json.v;
		} else if (b == 'purchases') {
			a[i].innerHTML = json.p;
		}
		else if (b == 'conversion') {
			var c = parseInt(json.v),
			d = parseInt(json.p),
			e = d/c*100;
			a[i].innerHTML = '<b>Conversion = purchases/visits*100 % = '+e+'% </b>';
		}
		else if (b == 'device') {
			a[i].innerHTML = '<ul>';
			for (var k = 0; k < json.d.length; k++)
			{
				a[i].innerHTML += '<li>'+json.d[k]+'</li>';		
			}
			a[i].innerHTML += '</ul>';

		}
	}
}








