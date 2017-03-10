// Name: Milou Bisseling
// Student number: 10427538

var margin = {top: 20, right: 55, bottom: 30, left: 60},
	width  = 1000 - margin.left - margin.right,
	height = 650  - margin.top  - margin.bottom;

// Set x and y range
var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .1);
var y = d3.scale.linear()
	.rangeRound([height, 0]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");
var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

// Define line
var line = d3.svg.line()
	.interpolate("cardinal")
	.x(function (d) { return x(d.label) + x.rangeBand() / 2; })
	.y(function (d) { return y(d.value); });

// Add color scale for lines (colorbrewer2.org: qualitative)
var color = d3.scale.ordinal()
	.range(["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628", "#f781bf", "#999999"]);

// Add svg container
var svg = d3.select("body").append("svg")
	.attr("width",  width  + margin.left + margin.right)
	.attr("height", height + margin.top  + margin.bottom)
	.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("milexdata2.csv", function (error, data) {
    var labelVar = "YEAR";
    var varNames = d3.keys(data[0]).filter(function (key) { return key !== labelVar;});
    	color.domain(varNames);
    var seriesData = varNames.map(function (name) {
      	return {
        	name: name,
        	values: data.map(function (d) {
        		return {
        			name: name, 
        			label: d[labelVar], 
        			value: +d[name]
        		};
    		})
   		};
	});
	console.log(seriesData);

	// Set x and y domain
	x.domain(data.map(function (d) { return d.YEAR; }));
	y.domain([
		d3.min(seriesData, function (c) { 
	    	return d3.min(c.values, function (d) { 
	    	return d.value; });
	    }),
	    
	    d3.max(seriesData, function (c) { 
	        return d3.max(c.values, function (d) { return d.value; });
	    })
	]);

	// Set x-axis
	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);

	// Set y-axis
	svg.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .append("text")
	        .attr("transform", "rotate(-90)")
	        .attr("y", 6)
	        .attr("dy", ".71em")
	        .style("text-anchor", "end")
	        .text("US Dollars (x1000)");

	// Add data
	var series = svg.selectAll(".series")
	   	.data(seriesData)
	    .enter().append("g")
	    	.attr("class", "series");

	// Draw lines
	series.append("path")
	    .attr("class", "line")
	    .attr("d", function (d) { return line(d.values); })
	    .style("stroke", function (d) { return color(d.name); })
	    .style("stroke-width", "4px")
	    .style("fill", "none")

	// Draw points on the lines
	series.selectAll(".point")
	    .data(function (d) { return d.values; })
	    .enter().append("circle")
	    .attr("class", "point")
	    .attr("cx", function (d) { return x(d.label) + x.rangeBand()/2; })
	    .attr("cy", function (d) { return y(d.value); })
	    .attr("r", "5px")
	    .style("fill", function (d) { return color(d.name); })
	    .style("stroke", "grey")
	    .style("stroke-width", "2px")
	    .on("mouseover", function (d) { showPopover.call(this, d); })
	    .on("mouseout",  function (d) { removePopovers(); })

	// Create legend
	var legend = svg.selectAll(".legend")
	    .data(varNames.slice().reverse())
	    .enter().append("g")
	        .attr("class", "legend")
	        .attr("transform", function (d, i) { return "translate(55," + i * 20 + ")"; });
	    legend.append("rect")
	        .attr("x", width - 10)
	        .attr("width", 10)
	        .attr("height", 10)
	        .style("fill", color)
	        .style("stroke", "grey");
	    legend.append("text")
	        .attr("x", width - 12)
	        .attr("y", 6)
	        .attr("dy", ".35em")
	        .style("text-anchor", "end")
	        .text(function (d) { return d; });

	// Create popovers (bootstrap)
	function removePopovers () {
	  	$('.popover').each(function() {
	    	$(this).remove();
	  	}); 
	}

	function showPopover (d) {
	  	$(this).popover({
	    	title: d.name,
	    	placement: 'auto top',
	    	container: 'body',
	    	trigger: 'manual',
	    	html : true,
	    	content: function() { 
	      		return "Year: " + d.label + 
	            "<br/>$" + d3.format(",")(d.value ? d.value: d.y1 - d.y0); 
	        }
	  	});
	  	$(this).popover('show')
	}
});

