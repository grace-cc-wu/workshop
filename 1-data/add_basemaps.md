###Add basemaps

This exercise covers the basics for adding basemaps to a Leaflet app.
The starter map simply loads a default base map, centers and zooms it in.
If you are new to Leafet you can get the examples and API documentation [here](http://leafletjs.com/).

###Steps

1. Copy and paste the code below into the [add_basemaps.html](./src/add_basemaps.html).

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

    </script>


    ```

2. In Chrome, navigate to `http://localhost:8000/1-data/src/add_basemaps.html`. You should see a map zoomed out to California.

3. Experiment with different basemaps such as `Stamen Watercolor` or `CartoDB DarkMatter`]. You can find code and preview the basemap options [here](http://leaflet-extras.github.io/leaflet-providers/preview/index.html).

4. As usual, if you make changes to your html, css or js file make sure you refresh browser to see your changes.

###Bonus

* Experiment with some api features such as setting zoom and changing the map center
