// Name: Milou Bisseling
// Student number: 10427538
// based on code from https://github.com/markmarkoh/datamaps/blob/master/README.md#getting-started

d3.queue()
	.defer(d3.json, 'data/worldbankdata.json')
	.defer(d3.json, 'data/womeninparliament.json')
	.await(analyze);

function analyze(error, worldbankdata, womeninparliament) {
	if (error) {
		console.log(error); 
	}
		worlddata = worldbankdata
		var series = [];
		worlddata.forEach(function(d) {
		    // Create new array with prefered format
		    series.push([d["id"], d["incomeLevel"]["id"], d["name"], d["incomeLevel"]["value"]]);
		});

		// Create variable for dataset in the appropriate format
		var dataset = {};

		    // Fill dataset in appropriate format
		    series.forEach(function(item){ 
		        var iso = item[0],
		        	fillKey = item[1]
		            country = item[2];
		            incomeLevel = item[3]
	        dataset[iso] = {fillKey: fillKey, Country: country, Incomelevel: incomeLevel };
		});

		womendata = womeninparliament
		var series2 = [];
		womendata.forEach(function(d) {
			series2.push([d["countryid"], d["1997"], d["1998"], d["1999"], d["2000"], d["2001"], d["2002"],
			d["2003"], d["2004"], d["2005"], d["2006"], d["2007"], d["2008"], d["2009"], d["2010"], d["2011"], 
			d["2012"], d["2013"], d["2014"], d["2015"], d["2016"]]);
		})

		console.log(series2);

// Render datamap
var map = new Datamap({
    element: document.getElementById('container'),
    scope: 'world',
    projection: 'mercator',
    data: dataset,
    fills: {
    	HIC: '#fcae91',
    	UMC: '#fb6a4a',
    	LMC: '#de2d26',
    	LIC: '#a50f15',
    	defaultFill: '#afafaf' 
    },    
    geographyConfig: {
    	borderOpacity: 1,
    	highlightBorderWidth: 2,
    	highlightBorderOpacity: 1,
    	// Change border on mouse hover
    	highlightBorderColor: '#000000',
    	// Don't change color on mouse hover
        highlightFillColor: function(geo) {
        	if (geo.fillKey === 'HIC') {
        		return '#fcae91'
        	}
        	else if (geo.fillKey === 'UMC') {
        		return '#fb6a4a'
        	}
        	else if (geo.fillKey === 'LMC') {
        		return '#de2d26'
        	}
        	else if (geo.fillKey === 'LIC') {
        		return '#a50f15'
        	}
        	else {
        		return '#afafaf'
        	}
        },  
        // Show desired information in tooltip	
		popupTemplate: function(geo, data) {
            // Show special tooltip if country is not in dataset
            if (!data) { return ['<div class="hoverinfo">',
            	'No data available for this country',
            	'</div>'].join('');}
            // Include country and raw data in tooltip
            return ['<div class="hoverinfo">',
                '<strong>', geo.properties.name, '</strong>',
                '<br>Income Level: ', data.Incomelevel, '',
                '</div>'].join('');
        	}    	
    	}
	});
}



