- you need to download google-closure from here first and put it at this level.

- https://github.com/google/closure-library/

and run npm install

test.py is the server to return the json.

json is returned in combined format from two files.

the combined file was generated using some commands with ipython.

Charting library was attempted but was too complex at the end for me to figure out in 2 hours.

So I just displayed json data for male/female and male/female - department wise filtered data.

Assumed that salary and # employees are potential values we are looking at - ofcourse displayed per department, overall. I wanted to do city as well but couldn't get it done.

I have some ideas here in a roughpad:
https://docs.google.com/document/d/1pPoG4BjjUJ_S-MRTBbSowcmy04_TE6GDpsIlO3q1bWM/edit


EDIT:
I created an improved main.js as main-improved.js - I think this scales much better in terms of visualization. I now treat it as a tree to dig-down. I would like to create a visualization as tree/zippy if I had charting skills :).
This was done after the 6pm deadline.


Instructions to run : 
## Setup closure library as.
  * 1.a git clone  https://github.com/google/closure-library/
  * 1.b cd closure-library
  * 1.c npm install
  * 1.d verify that closure-library/closure/goog/deps.js exists.

## Run the server to serve JSON data.
* 2.1 python test.py
  * This runs the server on port 8080.
  * You can verify it returns the data using http://localhost:8080/data
  * This server should handle CORS effectively so you can load the frontend application on any host.

## Run the server to server HTML files.
* 3.1 python -m http.server 8081
  * This runs the server on port 8081
* 3.2 Visit : http://localhost:8081/main.html

## You might want to visit  http://localhost:8081/main_improved.html to see a slightly more scalable version of producing this output.
