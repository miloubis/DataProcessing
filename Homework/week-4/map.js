// Name: Milou Bisseling
// Student number: 10427538
// based on code from https://github.com/markmarkoh/datamaps/blob/master/README.md#getting-started

window.onload = function() {

	// Load the data from json file
	var series = [];
	d3.json("worldbankdata.json", function(error, data) {
	    if (error) throw (error);
	    data.forEach(function(d) {
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
	});
};





