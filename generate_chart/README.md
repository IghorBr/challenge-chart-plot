# Plottinga a chart
Author: Ighor Bruno Nascimento de Brito

This project was developed in JavaScript/React for a challenge.
It plots a graph, based on a random sequence events.

## Tests
The implemented tests are:
    1 - Verify if it has no events inserted;
    2 - Verify if no event with type start, span or stop are missing;

## Development Choices
With react, I create three components for each one of the parts of the application: the header, the user input and the area where the chart will be plot plus the footer, instead of using four components, one for which part. I rather this way because, I didn't need to change elements between the Chart's components and the Footer's components.

The graphical library to plot the chart was ChartJS, it has been chosen because it is simple to implement and allow to plot data about multiple datasets.

To handle with a big amount of data, I just use a counter that stops considering events after twenty (this number was chosen in a arbitrary way). I used this method, because, that is the a simple way to do not consider a lot of data when plotting the chart.