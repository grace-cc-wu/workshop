###Start a local server

This exercise covers the basics for starting a local server.
Although you can just open your HTML file in any browser and view it, when you are loading external data sources it is more reliable to run a local server and view your page from http://localhost:8000.
There are many different ways of setting up a local server depending on what operating system you use. Here's a very simple one that works on our VM

###Steps

1. Open a terminal window. Change directory to the folder that contains your html file

    ```
    cd workshop
    ```

2. Start a local server using Python module
 
    ```
    python -m SimpleHTTPServer 8000
    ```
3. Open Chrome browser. Type `localhost:8000` into the url bar at top. You should see a web page with links to all the html files for difference exercies. Use the GitHub repo for instructions. 

3. You will be working in three windows
 
* HTML file open in a Chrome browser tab
* GitHub repo open in a Chrome brwoser tab
* Javascript file open in a code editor, e.g. Sublime Text


