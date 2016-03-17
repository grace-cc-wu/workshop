###Add thematic data from CartoDB

In this exercise we are going to experiment with adding a layer we have already styled in CartoDB.

###Steps

1. Add the javascript and css files for CartoDB.js into our html document. CartoDB.js inlcudes Leaflet so we don't have to load Leaflet separately.

2. Get the share link to the layer you styled from CartoDB Editor. For this exercise you can use the tick locations layer I uploaded to my CartoDB account.

3. Copy and paste the code below into src/add_thematic_data_from_cartodb.js

    ```javascript

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

      });


    ```

3. In Chrome, navigate to `http://localhost:8000/1-data/src/add_thematic_data_from_cartodb.html`. You should see tick locations styled in cartodb added to your map

4. If you hover over a marker it will label the marker with fields specified in CartoDB.

5. Check out CartoDB's online tutorials [Map Academy](http://academy.cartodb.com/courses/cartodbjs-ground-up/) for more details on how to use CartoDB.js

__Step through the code, read the comments to understand what's happening at each step. Ask questions!__

__Remember to refresh your browser to see your changes.__

