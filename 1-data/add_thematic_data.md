###Add thematic data

In this exercise we are going to experiment with different ways of adding your thematic data to the Leaflet app. 
If you are new to Leafet you can get the examples and API documentation [here](http://leafletjs.com/).

###Steps

1. We will use the  [Leaflet AJAX plugin](https://github.com/calvinmetcalf/leaflet-ajax) for loading geojson data. Script tags for loading javascript file are already in the html file for the exercise.

2. Copy and paste the code below into src/add_thematic_data.html.

    ```html

    <!-- Javascript code for your app goes in between script tags below -->
    <script type='text/javascript'>

      var map = L.map('map').setView([36.5, -118.5], 9);

      var CartoDB_Positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19
      });

      map.addLayer(CartoDB_Positron);
      map.setZoom(6);

      //var geojsonLayer = new L.geoJson.AJAX("geojson/tick_locations.geojson");       
      //geojsonLayer.addTo(map);


      var tickLocations = L.geoJson().addTo(map);
      

      $.getJSON("data/tick_locations.geojson", function(data) {
        tickLocations.addData(data);
      });

    </script>


    ```

3. Another way to load geojson is by using jQuery and it's $.getJSON method.

  ```javascript

      var tickLocations = L.geoJson().addTo(map);      

      $.getJSON("data/tick_locations.geojson", function(data) {
        tickLocations.addData(data);
      });
  ```

4. In Chrome, navigate to `http://localhost:8000/1-data/src/add_thematic_data.html`. You should see markers added to your map for tick locations using Leaflet's default marker style.

__Remember to refresh your browser to see your changes.__

###Bonus

* [StackExchange thread](http://gis.stackexchange.com/questions/68489/how-to-load-external-geojson-file-into-leaflet-map) and [Leaflet Geojson Tutorial](http://leafletjs.com/examples/geojson.html) on some other methods of adding geojson files to a leaflet map
