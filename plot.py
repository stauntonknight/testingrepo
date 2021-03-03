import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import ipywidgets as ipy
from ipywidgets import Output, VBox, widgets


# First gather the data I need and choose the display colors
employmentTypeData = pd.read_csv("combined.csv")
city = list(employmentTypeData['city'].unique().tolist());
gender = list(employmentTypeData['gender'].unique().tolist());
employmentType = list(employmentTypeData['employmentType'].unique().tolist());
color1 = 'red'
color2 = 'blue'
color3 = 'gray'

# This creates the initial figure.
# Note that px.scatter generates multiple scatter plot 'traces'. Each trace contains 
# the data points associated with 1 team/gender/employmentType depending on what the property
# of 'color' is set to.
trace1 = px.scatter(employmentTypeData, x='total', color='city')
fig = go.FigureWidget(trace1)

# Create all our drop down widgets
filterDrop = widgets.Dropdown(
    description='Filter:',
    value='city',
    options=['city', 'gender','employmentType']  
)
teamDrop1 = widgets.Dropdown(
    description='City:',
    options=list(employmentTypeData['city'].unique().tolist())  
)
teamDrop2 = widgets.Dropdown(
    description='City:',
    options=list(employmentTypeData['city'].unique().tolist())  
)
employmentTypeDrop1 = widgets.Dropdown(
    description='Employment type:',
    options=list(employmentTypeData['employmentType'].unique().tolist())  
)
employmentTypeDrop2 = widgets.Dropdown(
    description='Employment type:',
    options=list(employmentTypeData['employmentType'].unique().tolist())  
)
genderDrop1 = widgets.Dropdown(
    description='Gender:',
    options=list(employmentTypeData['gender'].unique().tolist())  
)
genderDrop2 = widgets.Dropdown(
    description='Gender:',
    options=list(employmentTypeData['gender'].unique().tolist())  
)

# This will be called when the filter dropdown changes. 
def filterResponse(change):
    # generate the new traces that are filtered by teamname, gender, or employmentType
    tempTrace = px.scatter(employmentTypeData, x='total', color=filterDrop.value)
    with fig.batch_update():
        # Delete the old traces and add the new traces in one at a time
        fig.data = []
        for tr in tempTrace.data:
            fig.add_scatter(x = tr.x, y = tr.y, hoverlabel = tr.hoverlabel, hovertemplate = tr.hovertemplate, \
                           legendgroup = tr.legendgroup, marker = tr.marker, mode = tr.mode, name = tr.name)
    # Call response so that it will color the markers appropriately
    response(change)

# This is called by all the other drop downs
def response(change):
    # colorList is a list of strings the length of the # of traces 
    if filterDrop.value == 'city':
        colorList = [color1 if x == teamDrop1.value else color2 if x == teamDrop2.value else color3 for x in teamNames]
    elif filterDrop.value == 'gender':
        colorList = [color1 if x == genderDrop1.value else color2 if x == genderDrop2.value else color3 for x in genders]
    else:
        colorList = [color1 if x == employmentTypeDrop1.value else color2 if x == employmentTypeDrop2.value else color3 for x in employmentTypes]
    with fig.batch_update():
        # Color each trace according to our chosen comparison traces
        for i in range(len(colorList)):
            fig.data[i].marker.color = colorList[i]

# These determine what function should be called when a drop down changes
teamDrop1.observe(response, names="value")
genderDrop1.observe(response, names="value")
employmentTypeDrop1.observe(response, names="value")
teamDrop2.observe(response, names="value")
genderDrop2.observe(response, names="value")
employmentTypeDrop2.observe(response, names="value")
filterDrop.observe(filterResponse, names="value")

# HBox and VBox are used to organize the other widgets and figures
container1 = widgets.HBox([filterDrop]) 
container2 = widgets.HBox([teamDrop1, genderDrop1, employmentTypeDrop1])
container3 = widgets.HBox([teamDrop2, genderDrop2, employmentTypeDrop2])
widgets.VBox([container1, container2, container3, fig])

