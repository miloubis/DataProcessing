// SYNCHRONOUS XMLHTTPREQUEST
var myrequest = new XMLHttpRequest();
var url = "https://miloubis.github.io/DataProcessing/Homework/week-2/debilt.html";
var alldata = null;
myrequest.open("GET", url, false);
myrequest.send();	
dateTemp = myrequest.responseText
dateTemp = myrequest.responseText.split("\n");

// GRAPH PROPERTIES
leftmargin = 80
rightmargin = 40
topmargin = 40
bottommargin = 40
graphwidth = canvas.width - leftmargin - rightmargin
graphheight = canvas.height - topmargin - bottommargin

// CHANGE DATE FORMAT FOR DATESTRING
function parseDate(str) {
    var y = str.substr(0,4),
        m = str.substr(4,2),
        d = str.substr(6,2);
    return new Date(y,m,d);
}

// SPLIT DATA INTO TWO ARRAYS FOR TEMP AND DATE
//var dateTemp = document.getElementById('rawdata').value.split('\n');

dates = []
temps = []
var millisecondsinoneday = 86400000
var yearscorrection = 16830.9
for (i = 0; i < dateTemp.length-1; i++) { 
	var chunks = dateTemp[i].split(/[\s,]+/);
	var date = chunks[chunks.length-2];
	var temp = chunks[chunks.length-1];
	// TRANSFORM FROM MILLISECONDS TO DAYS OF THE YEAR
	var day = (parseDate(date).getTime()) / millisecondsinoneday - yearscorrection ;
	var day = Math.round(day) - 1;
	// SAVE DATES TO ARRAY
	dates.push(day);
	// SAVE TEMPERATURES TO ARRAY
	temps.push(parseInt(temp));
}

// FUNCTION TO MAKE DATA POINTS IN THE RIGHT SCALE
function createTransform(domain, range){

    var domain_min = domain[0]
    var domain_max = domain[1]
    var range_min = range[0]
    var range_max = range[1]

    // formulas to calculate the alpha and the beta
   	var alpha = (range_max - range_min) / (domain_max - domain_min)
    var beta = range_max - alpha * domain_max

    // returns the function for the linear transformation (y= a * x + b)
    return function(x){
      return alpha * x + beta;
    }
}

// MINIMA AND MAXIMA OF DATES AND TEMPERATURES
tempmin = (Math.min.apply(null, temps));
tempmax = (Math.max.apply(null, temps));
datemin = (Math.min.apply(null, dates));
datemax = (Math.max.apply(null, dates));

transformtemp = createTransform([300, -50], [bottommargin, graphheight + bottommargin]);
transformdate = createTransform([datemin, datemax], [leftmargin, graphwidth + leftmargin]);

// SAVE TRANSFORMED DATES AND TEMPERATURES TO AN ARRAY
transformeddates = []
transformedtemps = []
for (var i = 0; i < dates.length; i++) {
	var x = transformdate(dates[i]);
	var y = transformtemp(temps[i]);
	transformeddates.push(x);
	transformedtemps.push(y);
}

// DRAW GRAPH
window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d"); 

    // DRAW X-AXIS
    context.beginPath();
	context.moveTo(leftmargin, bottommargin + graphheight);
	context.lineTo(leftmargin + graphwidth, bottommargin + graphheight);
	context.stroke();

	// DRAW TICKS ON X-AXIS (X,Y)
	var tick = graphwidth / 12
	for (var i = 0; i < 13; i++) {
		context.beginPath();
		context.moveTo(leftmargin + tick*i, bottommargin + graphheight);
		context.lineTo(leftmargin + tick*i, bottommargin + graphheight + 5);
		context.stroke();
	}

	// DRAW TEMPERATURE LABLES ON X-AXIS
	var tick = graphwidth / 12
	var label = ['','Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Okt', 'Nov', 'Dec']
	for (var i = 0; i < 13; i++) {
		context.font = '10pt Arial';
		context.textAlign = "center";
		context.fillText(label[i], leftmargin - 30 + tick*i, topmargin + graphheight + 23);
	}
	
	// DRAW Y-AXIS
	context.beginPath();
	context.moveTo(leftmargin, bottommargin + graphheight);
	context.lineTo(leftmargin, topmargin);
	context.stroke();

	// DRAW TICKS ON Y-AXIS (X,Y)
	var tick = graphheight / 7
	for (var i = 0; i < 8; i++) {
		context.beginPath();
		context.moveTo(leftmargin, bottommargin + graphheight + tick*-i);
		context.lineTo(leftmargin - 5, bottommargin + graphheight + tick*-i);
		context.stroke();
	}

	// DRAW TEMPERATURE LABLES ON Y-AXIS
	var tick = graphheight / 7
	var label = [-5, 0, 5, 10, 15, 20, 25, 30]
	for (var i = 0; i < 13; i++) {
		context.font = '10pt Arial';
		context.textAlign = "center";
		context.fillText(label[i], leftmargin - 20, topmargin + 5 + graphheight - tick*i);
	}

    // PLOT GRAPH
    context.beginPath();
    for (var i = 0; i < temps.length; i++) {
    	context.lineTo(transformeddates[i], transformedtemps[i]);
    	context.stroke();
    } 
    context.closePath;

 	// TEXT
	context.font = '18pt Arial';
	context.textAlign = "left";

	//TITLE
	context.fillText('Average Temperature De Bilt (NL) 2016', (graphwidth/2), 50);

	//Y-AXIS TITLE
	context.save();
	context.rotate(-Math.PI / 2);
	context.font = '14pt Arial';
	context.fillText('Temperature (Celsius)', 300 * -1, 30);
	context.restore();

    
}