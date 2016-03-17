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
    ADD TICK LOCATIONS FROM CARTODB
  ********************************************************************************/
  
  // Link to tick locations map in CartoDB account 
  var vizJson = 'https://mukhtyar.cartodb.com/api/v2/viz/83625b06-e7da-11e5-81ed-0e787de82d45/viz.json';

  // Create layer and add to leaflet map
  cartodb.createLayer(map, vizJson)
    .addTo(map)
    .on('done', function(layer) {
      layerControl.addOverlay(layer, "Tick Collection Locations");
    })
    .on('error', function(err) {
      alert("some error occurred: " + err);
    });


  /********************************************************************************
    ADD LAYER CONTROL
  ********************************************************************************/

  // Create a new Leaflet layer control
  var layerControl = L.control.layers().addTo(map);

  // Add basemap defined earlier to layer control
  layerControl.addBaseLayer(CartoDB_Positron, "Grayscale");


})();