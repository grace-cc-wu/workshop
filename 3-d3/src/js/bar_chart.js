function barChart() {

  // Various internal, private variables of the module.
  var margin = {top: 10, right: 20, bottom: 45, left: 30},
    width = 450,
    height = 200;

  var parseDate = d3.time.format("%Y").parse; // Function for parsing date
  var xRoundBands = 0.2;

  var xScale = d3.scale.ordinal();

  var yScale = d3.scale.linear();

  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .tickFormat(d3.time.format("%Y"));

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(10);

  var axisLabel = 'Rate';
      

  // Main internal module functionality
  function chart(selection) {
    selection.each(function(data) {

      console.log(data);

      // Convert string Year into date type and add a new attribute d.date
      // Convert Rate into a number type add a new attribute d.value
      data.forEach(function(d) {
        d.date = parseDate(d.Year);
        d.value = +d.Rate;
      });
    
      // Set the domain and range of x-scale.
      xScale
          .domain(data.map(function(d) { return d.date; }))
          .rangeRoundBands([0, width - margin.left - margin.right], xRoundBands);
         
      // Set the domain and range of y-scale.
      yScale
          .domain([0, d3.max(data, function(d) { return d.value; })])
          .range([height - margin.top - margin.bottom, 0])
          .nice();
          

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("g").attr("class", "bars");
      gEnter.append("g").attr("class", "y axis");
      gEnter.append("g").attr("class", "x axis");

      // Update the outer dimensions.
      svg .attr("width", width)
          .attr("height", height);

      // Update the inner dimensions.
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Place x axis at the bottom of the chart
      g.select(".x.axis")
        .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
        .call(xAxis.orient("bottom"))
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", "-.55em")
          .attr("transform", "rotate(-90)" );

      // Place y-axis at the left
      g.select(".y.axis")
        .call(yAxis)
        .append("text")
          .attr("dx", "3em")
          .attr("dy", "0.5em")
          .style("text-anchor", "end")
          .text(axisLabel);


      // Setup the enter, exit and update of the actual bars in the chart.
      // Select the bars, and bind the data to the .bar elements.
      var bar = svg.select(".bars").selectAll(".bar").data(data);

      // If there aren't any bars create them
      bar.enter().append("rect")
        .classed("bar", true)
        .attr("x", function(d) { return xScale(d.date); })
        .attr("width", xScale.rangeBand())
        .attr("y", function(d) { return yScale(d.value); })
        .attr("height", function(d) { return height - margin.bottom - margin.top - yScale(d.value); });

      // If updates required, update using a transition.
      bar.transition()
        .ease("linear")
        .attr("x", function(d) { return xScale(d.date); })
        .attr("width", xScale.rangeBand())
        .attr("y", function(d) { return yScale(d.value); })
        .attr("height", function(d) { return height - margin.bottom - margin.top - yScale(d.value); });

      // If exiting, i.e. deleting, fade using a transition and remove.
      bar.exit().remove();



          
    });

  }

  // A series of public getter/setter functions

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.axisLabel = function(_) {
    if (!arguments.length) return axisLabel;
    axisLabel = _;
    return chart;
  };


  return chart;
}