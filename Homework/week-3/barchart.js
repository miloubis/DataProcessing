// Name: Milou Bisseling
// Student number: 10427538
// Inspired on the bost.ocks website: https://bost.ocks.org/mike/bar/3/


// Load the data from json file
d3.json("data.json", function(error, data) {
    if (error) throw (error);
    data.forEach(function(d) {
        d.Jaar = d.Jaar;
        d.Aantal_meerlingen = +d.Aantal_meerlingen;
    });

// Set the dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 60, left: 30},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// Define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

// Define tooltip
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function(d) {
    return "<span>" + d.Aantal_meerlingen + "</span>";})

// Add the SVG element
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);
	
  // Scale the range of the data
  x.domain(data.map(function(d) { return d.Jaar; }));
  y.domain([0, d3.max(data, function(d) { return d.Aantal_meerlingen; })]);

  // Add axis to svg
  	svg.append("g")
      	.attr("class", "x axis")
      	.attr("transform", "translate(0," + height + ")")
      	.call(xAxis)
    .selectAll("text")
      	.style("text-anchor", "end")
      	.attr("dx", "-.8em")
      	.attr("dy", "-.55em")
      	.attr("transform", "rotate(-90)" );

  	svg.append("g")
      		.attr("class", "y axis")
      		.call(yAxis)
    	.append("text")
      		.attr("transform", "rotate(-90)")
      		.attr("y", 5)
      		.attr("dy", ".71em")
      		.style("text-anchor", "end")
      		.text("Aantal meerlingen");

// Add bars to the svg
var bars = svg.selectAll("bar")
    .data(data)
    .enter()
    .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Jaar); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Aantal_meerlingen); })
      .attr("height", function(d) { return height - y(d.Aantal_meerlingen); })
	  .on("mouseover", tip.show)
      .on("mouseout", tip.hide)

});




