(function(){

  /********************************************************************************
    INITIALIZE MAP
  ********************************************************************************/

  var map = L.map('map', {
    center: [37, -113],
    zoom: 6,
    minZoom: 5,
    maxZoom: 12,
    attributionControl: true,
    touchZoom: false,
    scrollWheelZoom: false
  });


  /********************************************************************************
    ADD BASEMAP
  ********************************************************************************/

  // Create a new basemap
  var CartoDB_Positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
  });

  map.addLayer(CartoDB_Positron);
  map.setZoom(6);


  /********************************************************************************
    ADD TICK LOCATIONS
  ********************************************************************************/
  
  // Intialize a variable to holda Leaflet geoJson layer
  var tickLocations;

  // Create object to hold options for styling a custom marker
  var geojsonMarkerOptions = {
    radius: 4,
    fillColor: "#DE7A22",
    color: "#C56109",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.5
  };

  // Create a function to create a custom marker
  function createMarker(feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions);
  }

  // Create a function to generate popup content
  function bindPopup(feature, layer) {
    var popupText = feature.properties.Location;
    if (feature.Specific_Location_Information != undefined) {
      popupText = popupText + " (" + feature.specific_location_information + ")";
    }
    layer.bindPopup(popupText);
  }

  // Use ajax call to get data. After data comes back apply styles and bind popup
  // If you're experienced with jQuery, you'll recognize we're making a GET 
  // request and expecting JSON in the response body. 
  // We're also passing in a callback function that takes the response JSON and adds it to the document.
  $.getJSON("data/tick_locations.geojson", function(data) {

    // Create new L.geoJson layer with data recieved from geojson file
    // and set the tickLocations variable to new L.geoJson layer
    tickLocations = L.geoJson(data, {
      pointToLayer: createMarker,
      onEachFeature: bindPopup
    });

    // Add tick locations to map
    tickLocations.addTo(map);

    // Add tick locations layer as an overlay to layer control
    // Note: $.getJSON method is asynchronous. Although we intialize layerControl later in the code
    // it should already exists by the time this code runs. 
    layerControl.addOverlay(tickLocations, "Tick Collection Locations");

  });


  /********************************************************************************
    ADD LAYER CONTROL
  ********************************************************************************/

  // Create a new Leaflet layer control
  var layerControl = L.control.layers(null, null, { position: 'bottomleft' }).addTo(map);

  // Add basemap defined earlier to layer control
  layerControl.addBaseLayer(CartoDB_Positron, "Grayscale");


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


  /********************************************************************************
    ADD A GEOCODER
  ********************************************************************************/








})();
