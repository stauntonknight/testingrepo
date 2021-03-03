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
