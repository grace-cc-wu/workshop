# Web Maps and Data Visualization with Leaflet and D3

"Application development is a creative process. Technology should bridge the gap between creative thinking and the end result"

##Leaflet

- Lightweight, simple & flexible open source JavaScript mapping library
- Created by [Vladimir Agafonkin](http://agafonkin.com/en/). Great speaker, checkout some of his talks on Leaflet
- Mobile-friendly. Well documented [API](http://leafletjs.com/reference.html), huge amount of [plugins](http://leafletjs.com/plugins.html). 
- Use with other JS mapping libraries (from ESRI, CartoDB, Mapbox) or by itself

###What does it do?

- Slippy maps with panning and zooming
- Provides functions for converting data into map layers
- Provides mouse interaction
- Does not provide any data
- You provide tile basemaps and data for overlays
- Easy to extend with plugins
- e.g. Plugin for building [storymap](http://jackdougherty.github.io/leaflet-storymap/index.html) with Leaflet

##D3 (Data Driven Documents)

- [JavaScript library](https://d3js.org/) for producing dynamic, interactive data visualizations in web browsers.
- Makes use of the widely implemented SVG, HTML5, and CSS standards
- Created by [Mike Bostock](https://bost.ocks.org/mike/), Vadim Ogievetsky and Jeffrey Heer (all at that time were part of the Stanford Visualization Group).
- Very active user community in Bay Area. Checkout [Bay Area d3 User Group](http://www.meetup.com/Bay-Area-d3-User-Group/).
- Rich ecosystem of examples showing visualization types, coding techniques [blockbuilder.org/](http://blockbuilder.org/), [bl.ocks.org/](http://bl.ocks.org/)
- [Navigating the D3 Ecosystem](http://enjalot.github.io/talks/navd3eco/)
- How do I learn D3.js? [Quora thread](https://www.quora.com/How-do-I-learn-D3-js)

###What does it do?

- No plugins required, works directly with existing web technologies, can manipulate any part of the web page
- It is *not* a graphics library, it is *not* a charting library
- It provides  handy utilities for processing data (array, time series, geo data) and for binding these data to visual elements on a web page
- Storymap built using D3 - [Faces of Fracking](http://www.facesoffracking.org/data-visualization/)

##Exercises

The exercises here are designed to showcase some ways you can use Leaflet and D3 to build custom web applciations. You can complete these exercises in any order and at your own pace. Choose ones you want to learn, and skip those you already know. You can bring your own data or use what we provide. 

### 0. Setup Your Development Environment
* [Start a Local Server](./0-setup/start_a_local_server.md)
* [Build a starter Leaflet app](./0-setup/build_starter_leaflet_app.md)

### 1. Data

* [Add basemaps](./data/import_data.md)
* [Add data hosted in your CartoDB account]
* [Add data from geojson file that you host]
* [Add a really large geojson file that you host and create vector tiles on the client side]

### 2. User Interaction

* [Add and style popups ](./data/import_data.md)
* [Add drawing tools to map ](./data/import_data.md)
* [Timeslider ](./data/import_data.md)
* [Add url hash ](./data/import_data.md)

### 3. Spatial Analysis In Your Browser

* [Create Buffers ](./data/import_data.md)

### 4. Use external APIs

* [Get data from Cal-Adapt API](./data/import_data.md)

### 5. Data visualization components built with D3 

* [Make a map with D3](./data/import_data.md)


