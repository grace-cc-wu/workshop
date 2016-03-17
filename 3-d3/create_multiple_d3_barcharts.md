###Create multiple D3 bar charts

In this exercise we are going to experiment with adding multile bar charts using our barChart module.
 
If you are new to D3 you can get API documentation [here](https://d3js.org/).

###Steps


1. For this exercise we will use the full csv file with Diseases Incidence Rate for California and all counties `data/lyme_disease_2001-2014.csv`


2. Copy and paste the code below into `src/create_multiple_d3_barchart.js` 


```javascript

  /********************************************************************************
    CREATE MULTIPLE D3 BAR CHARTS
  ********************************************************************************/

  var data;

  // Use d3.csv to convert a csv file into an array of objects
  // This method is also asynchronous like jQuery's $.getJSON method
  d3.csv("data/lyme_disease_2001-2014.csv", function(error, _data) {
    data = _data;
    renderChart(data, 'California');
  });

  // Create an instance of a barChart 
  // Neither data nor selection has yet been passed to the chart, so nothing will
  // actually happen based upon this function call
  var totalsChart = barChart();

  // Pass attributes using the setters provided by barChart
  totalsChart.width(450);
  totalsChart.height(200);
  totalsChart.axisLabel('Total');

  // Create a second instance of barChart 
  var maleChart = barChart();
  maleChart.width(275);
  maleChart.height(200);
  maleChart.axisLabel('Male');

  // Create a third instance of barChart 
  var femaleChart = barChart();
  femaleChart.width(275);
  femaleChart.height(200);
  femaleChart.axisLabel('Female');


  function renderChart(data, county) {

    var totalsData = data.filter( function(item) {
      return (item.County == county && item.Sex == 'Total');
    });
    
    var maleData = data.filter( function(item) {
      return (item.County == county && item.Sex == 'Male');
    });

    var femaleData = data.filter( function(item) {
      return (item.County == county && item.Sex == 'Female');
    });


    // Select the chart-canvas div in HTML, bind data to it, draw the chart  
    d3.select(".chart-canvas.total")
      .datum(totalsData)
      .call(totalsChart);

    d3.select(".chart-canvas.male")
      .datum(maleData)
      .call(maleChart);


    d3.select(".chart-canvas.female")
      .datum(femaleData)
      .call(femaleChart);
  }

```


3. Copy and paste the following code to `js/bar_chart.js`. This adds a new getter/setter function for y axis label


```javascript

  chart.axisLabel = function(_) {
    if (!arguments.length) return axisLabel;
    axisLabel = _;
    return chart;
  };

```


4. In Chrome, navigate to `http://localhost:8000/3-d3/src/create_multiple_d3_barcharts.html`


5. Bar charts of Lyme Disease Incidence Rate for Total, Male and Female population for California should be created in the sidebar.


6. Let's add functionality to update charts with data for individual counties. We will attach it to the click event.


7. Add a new click event handler to the county layer. This will update data in the charts when user clicks on a county.


```javascript

  function updateChart(){

    // Get county name
    var countyName = this.feature.properties.CountyNAME;
    $('.heading-location').text(countyName);

    // Remove the word County from string because the csv file does not have it
    var idx = countyName.indexOf(' County');
    renderChart(data, countyName.slice(0, idx));
  }

```


8. Update the `handleLayer` function for county layer to call `updateChart` when county is clicked


```javascript

  // Style each layer
  function handleLayer(layer){

    // Get population density and corresponding color (hexvalue) from color scale
    var popDensity = (layer.feature.properties.POP2014_SQMI);
    var fillColor = colorScale(popDensity).hex();  
    
    // Style polygons
    layer.setStyle({
      fillColor : fillColor,
      fillOpacity: 1,
      color:'#B7B8B6',
      weight:2,
      opacity:.5
    });
    
    // Attach events to each polygon
    layer.on({
      mouseover : enterLayer,
      mouseout: leaveLayer,
      click: updateChart //new
    });

  }

```


9. In Chrome, navigate to `http://localhost:8000/3-d3/src/create_multiple_d3_barcharts.html`. 


10. Now bar charts should update each time you click on a county


__Step through the code, read the comments to understand what's happening at each step. Ask questions!__

__Remember to refresh your browser to see your changes.__
