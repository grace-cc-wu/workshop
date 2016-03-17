###Add a reusable D3 chart

In this exercise we are going to experiment with adding a bar chart created with D3.
 
If you are new to D3 you can get API documentation [here](https://d3js.org/).

###Steps

1. A reusable chart can be used for inserting the chart to any DOM element, possibly multiple times on the same page, albeit with different data. With the code you added in the earlier excercise (add_a_d3_chart), if you wanted to add a second chart to the page you have to repeat the code all over again. 

2. A good place to start by reading [Towards Resuable Charts](https://bost.ocks.org/mike/chart/) where Mike Bostock proposes a convention for creating reusable charts.

3. [This](https://bocoup.com/weblog/reusability-with-d3) blog post and [this book](http://backstopmedia.booktype.pro/developing-a-d3js-edge/1-getting-started/) do a great job os clarifying the resuable charts api with examples and explanations.

4. Create a new js file `src/bar_chart.js`. This file needs to be loaded before your main applciation js file. We will also move the chart css to a separate file. The following tags area already added to the html file for this exercise

 ```html
    <link rel="stylesheet" href="css/chart.css">
 
    <!-- Javascript code for your app goes in between script tags below -->
    <script src="js/bar_chart.js"></script>
    <script src="js/add_a_reusable_d3_chart.js"></script>
 ```

5. Copy and paste the code below into `src/bar_chart.js`

    ```javascript
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


  return chart;
}
    ```

6. Copy and paste the code below into `src/add_a_reusable_d3_chart.js` 

```javascript
  /********************************************************************************
    ADD A RESUABLE D3 CHART
  ********************************************************************************/

  var data;

  // Use d3.csv to convert a csv file into an array of objects
  // This method is also asynchronous like jQuery's $.getJSON method
  d3.csv("data/lyme_disease_2001-2014.csv", function(error, _data) {

    data = _data;

    var totalsData = data.filter( function(item) {
      return (item.County == 'California' && item.Sex == 'Total');
    });

    // Create an instance of a barChart 
    // Neither data nor selection has yet been passed to the chart, so nothing will
    // actually happen based upon this function call
    var totalsChart = barChart();

    // Pass attributes using the setters provided by barChart
    totalsChart.width(450);
    totalsChart.height(200);
    totalsChart.axisLabel('Total');

    // Select the chart-canvas div in HTML, bind data to it, draw the chart  
    d3.select(".chart-canvas.total")
      .datum(totalsData)
      .call(totalsChart);


  });
```

7. In Chrome, navigate to `http://localhost:8000/3-d3/src/add_a_reusable_d3_chart.html`. 

8. A bar chart of Lyme Disease Incidence Rate is created in the sidebar. It should look same as the chart in previous exercise.



__Step through the code, read the comments to understand what's happening at each step. Ask questions!__

__Remember to refresh your browser to see your changes.__
