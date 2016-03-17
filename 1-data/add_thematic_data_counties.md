###Add thematic data counties

In this exercise we are going to explore one way in which you can add larger datasets.
 
If you are new to Leafet you can get the examples and API documentation [here](http://leafletjs.com/).

###Steps

1. The geojson files we have been working with are small. Larger geojson files can take longer to load depending on size and network speed. There are couple of ways you can deal with larger files

2. Use the topojson format. Topojson is an extension of GeoJSON that encodes topology. The following code has already been added to the html file for this exercise. It adds the js library with topojson specification and extends the Leaflet GeoJSON object to load topojson files

 ```html
     <!-- Load TopoJSON from CDN -->
    <!-- TopoJSON is an extension of GeoJSON that encodes topology -->
    <!-- https://github.com/mbostock/topojson/wiki -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/topojson/1.6.20/topojson.js"></script>

    <!-- Javascript code for extending Leaflet's L.geoJson layer to read topojson files -->
    <script>
      // Copyright (c) 2013 Ryan Clark
      // https://gist.github.com/rclark/5779673
      L.TopoJSON = L.GeoJSON.extend({
        addData: function(jsonData) {    
          if (jsonData.type === "Topology") {
            for (key in jsonData.objects) {
              geojson = topojson.feature(jsonData, jsonData.objects[key]);
              L.GeoJSON.prototype.addData.call(this, geojson);
            }
          }    
          else {
            L.GeoJSON.prototype.addData.call(this, jsonData);
          }
        }  
      });
    </script>
 ```

3. You can convert geojson to topojson using [mapshaper.org](http://mapshaper.org/). Compare the file sizes between geojson and topojson. You can also further reduce file size by simplifying the geometry. It depends on your app, how much detail you need to show.

3. Copy and paste the code below into src/add_thematic_data_and_counties.js

    ```javascript
/********************************************************************************
    ADD COUNTY POLYGONS
  ********************************************************************************/

  // Create a new L.TopoJSON layer
  var countyLayer = new L.TopoJSON();

  // Create a color scale for styling counties
  var colorScale = chroma.scale(['4CB5F5', '34675C']);
  var colorScaleDataValues = [];

  // The code below is another way to use jQuery's $.getJSON method
  // See https://davidwalsh.name/write-javascript-promises
  // Use the promise object returned by the $.getJSON method. 
  // When the response is returned, the .done method is called with the function (callback)
  // you provide. If the request fails, the .fail method is called.
  $.getJSON('data/ca_counties_census.topo.json')
    .done(addCountyData)
    .fail(function() {
      $('body').append('<p>Oh no, something went wrong with the county layer!</p>');
  });


  function addCountyData(topoData){

    // This is calling the addData method of the new L.TopoJSON layer we defined earlier
    countyLayer.addData(topoData);
    
    // This is calling the addTo method of Leaflet's L.layerGroup
    countyLayer.addTo(map);

    // This is calling the eachLayer method of Leaflet's L.layerGroup
    // Note: L.TopoJSON extends L.GeoJSON extends L.FeatureGroup extends L.layerGroup
    // It iterates over the layers of the group and calls function addToDomain that we define below
    countyLayer.eachLayer(addToDomain);

    // Calculate quantile breaks for color scale
    calcQuantileBreaks();

    // Add legend
    addLegend();

    // For each layer it call function handleLayer that we define below
    countyLayer.eachLayer(handleLayer);

    // Move data behind tick locations
    countyLayer.bringToBack();

    // Add overlay to layer control
    layerControl.addOverlay(countyLayer, "CA Counties");
  }


  // Add population density values to color scale
  function addToDomain(layer){
    var value = layer.feature.properties.POP2014/layer.feature.properties.SQMI;
    layer.feature.properties['POP2014_SQMI'] = value;
    colorScaleDataValues.push(value);
  }


  // Calculate quantile breaks for color scale
  function calcQuantileBreaks(){
    colorScale.domain(colorScaleDataValues, 5, 'quantiles');
  }


  // Add legend
  // Inspiration for this legend https://www.mapbox.com/mapbox.js/example/v1.0.0/custom-legend/
  function addLegend(){

    // Get colors from color scale
    // Returns 5 colors since we specified 5 classes earlier
    var colors = colorScale.colors();

    // Append a new span element for each color
    colors.forEach(function(hexValue){
      $('.legend').append("<span style='background:" + hexValue + ";'></span>")
    });

    // Get range from color scale
    // Returns 6 values that bound the 5 classes
    var rangeValues = colorScale.domain();

    // Append a new label element for first 2 range values
    $('.legend').append("<label>" + Math.round(rangeValues[0]) + " - " + Math.round(rangeValues[1]) + "</label>")
    
    // Filter out the first two range values and create a new array
    var labels = rangeValues.filter(function(val, idx){
      if (idx > 1) {
        return val;
      }
    });
    // Append a new label element for remaining range values
    labels.forEach(function(label){
      $('.legend').append("<label>" + Math.round(label) + "</label>")
    });
  }


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
      mouseout: leaveLayer
    });

  }


  // Function fired when user's mouse enters the layer
  function enterLayer(){

    var county = this.feature;

    // Get county name and pop. density and create a new html string
    var countyName = county.properties.CountyNAME;
    var density = county.properties.POP2014_SQMI;
    var html = countyName + '<br/>' + Math.round(density) + ' people / square mile';

    // Append html string to p element with .info class
    $('.info').html(html);
    
    // Change style of polygon
    this.setStyle({
      weight:3,
      opacity: 1
    });

  }


  // Function fired when user's mouse leaves the layer
  function leaveLayer(){
    $('.info').text('Hover over a county');
    this.setStyle({
      weight:2,
      opacity:.5
    });
  }
    ```

4. In Chrome, navigate to `http://localhost:8000/1-data/src/add_thematic_data_counties.html`. 

5. If you hover over a county it will add County name and population to the sidebar


__Step through the code, read the comments to understand what's happening at each step. Ask questions!__

__Remember to refresh your browser to see your changes.__

