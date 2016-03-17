###Add a geocoder

In this exercise we are going to add a geocoder control.
 
If you are new to Leafet you can get the examples and API documentation [here](http://leafletjs.com/).

###Steps

1. There are lot of services that provide geocoding. [Nominatim](https://nominatim.openstreetmap.org/) and [MapZen](https://mapzen.com/projects/search?lng=-122.24710&lat=37.53310&zoom=12) are two that I have tried. Other geocoding services - Google, Bing, CartoDB, Mapbox, etc.

2. We will use a [leaflet plugin](https://github.com/perliedman/leaflet-control-geocoder) that adds a geocoder control to a leaflet map. You have the option of using different geocoding service with this plugin. 

2. Download and load the javascript and css files for plugin. The following is already added to the html file for this exercise

 ```html
<link rel="stylesheet" href="js/lib/leaflet-control-geocoder/Control.Geocoder.css" />
<script src="js/lib/leaflet-control-geocoder/Control.Geocoder.js"></script>
 ```

3. Copy and paste the code below into src/add_a_geocoder.js

    ```javascript
/********************************************************************************
    ADD A GEOCODER
  ********************************************************************************/

  // Create a new geocoder that uses the Nominatim service provided by OSM
  // The countrycodes : 'us' option restricts searches to locations within US
  // For more options see https://github.com/perliedman/leaflet-control-geocoder
  var nominatim = new L.Control.Geocoder.Nominatim({
    geocodingQueryParams: {
      countrycodes: 'us'
    }
  });

  // Create a new geocoder control and pass in nominatim as the geocding service to use
  var geocoder = L.Control.geocoder({
    position: 'topleft',
    geocoder: nominatim
  }).addTo(map);

  // Intialize a new Leaflet Marker layer to store the geocding result
  var geocodeMarker = new L.Marker();

  // Overwrite the markGeocode function provided by geocoder control
  geocoder.markGeocode = function(result) {
    
    // Pans map to center
    map.setView(result.center, 8);

    // If a Leaflet Marker layer created by previous geocoding query exists, remove it from map
    if (map.hasLayer(geocodeMarker)){
      map.removeLayer(geocodeMarker);
    };

    // Update Leaflet Marker's location and popup content
    // Add to map and open popup
    geocodeMarker
      .setLatLng(result.center)
      .bindPopup(result.name || result.html)
      .addTo(map)
      .openPopup();    

  };

  // If user clicks anywhere on map remove geocoding result
  map.on('click', function(e){
    if (map.hasLayer(geocodeMarker)){
      map.removeLayer(geocodeMarker);
    };
  });
    ```

4. In Chrome, navigate to `http://localhost:8000/1-interaction/src/add_a_geocoder.html`. 

5. Search for a place name.


__Step through the code, read the comments to understand what's happening at each step. Ask questions!__

__Remember to refresh your browser to see your changes.__


