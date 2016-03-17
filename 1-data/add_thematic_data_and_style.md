###Add thematic data and style

In this exercise we are going to experiment with different ways of adding your thematic data to the Leaflet app and applying styles to it. 
If you are new to Leafet you can get the examples and API documentation [here](http://leafletjs.com/).

###Steps

1. Our js code is going to get bigger. Let's move it to a separate js file and reference that in our html file. This way we can take better advantage of syntax highlighting that code editors like Sublime Text provide and reserve the html file for content.

2. We are also going to move the code inside a Immediately Invoked Function Expression (IIFE) block to prevent us from creating any global variables that could cause conflicts later on. Read more on IIFE [here](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) and [here](http://gregfranko.com/blog/i-love-my-iife/). It looks like this:

    ```js
    // Anonymous function, i.e. function without a name
    (function(){
      // my special code
    }()); // The parentheses make sure the anonymous function gets called immediately

    ```

3. Leaflet allows you to pass a variety of callbacks as options to `L.geoJson` - nicely summarized [here](http://savaslabs.com/2015/05/18/mapping-geojson.html#adding-popups)

3. Copy and paste the code below into the [add_thematic_data_and_style.js](./src/add_thematic_data_and_style.js).

    ```javascript

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


    ```

3. Let's also add a Leaflet Layer Control to the bottom left of our map. Experiment with different [options](http://leafletjs.com/reference.html#control) you can pass to Leaflet Controls

    ```javascript

      /********************************************************************************
        ADD LAYER CONTROL
      ********************************************************************************/

      // Create a new Leaflet layer control
      var layerControl = L.control.layers(null, null, { position: 'bottomleft' }).addTo(map);

      // Add basemap defined earlier to layer control
      layerControl.addBaseLayer(CartoDB_Positron, "Grayscale");


    ```

4. In Chrome, navigate to `http://localhost:8000/1-data/src/add_thematic_data.html`. You should see markers added to your map for tick locations using styles we specified in the geojsonMarkerOptions object.

5. If you click on a marker it will open a popup with text we specified in the bindPopup function.

__Read through the comments in the code to understand what's happening at each step.__

__Remember to refresh your browser to see your changes.__

