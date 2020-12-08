import * as React from 'react';
import * as ChartJS from 'chart.js';
import './styles.css';

/**
 * Class that creates the footer and the chart
 * First, we create a div, that contains a canvas, which contains the chart
 * and another div that contains the footer
*/


class Chart extends React.Component {
    render() {
        return (
            <>
            <div>
                <canvas id='chartSpace'></canvas>
            </div>
            <div className='footer'>
                <input id='buttonChart' type='button' value='Generate chart' onClick={() => this.makeChart()} />
            </div>
            </>);
    }


    makeChart = () => {
        /**
         * First, we find the textarea, where our events will be typed
         * and parsed it into JSON elements
         */
        let inputText = document.querySelector('#userInput').value;

        if (!inputText) {
            window.alert('Insert the events');
            return 1;
        }

        let arrayString = inputText.split('\n');
        let events = [];
        let countEvents = 20, count = 0;

        for (let index = 0; index < arrayString.length; index++) {
            let object = JSON.parse(arrayString[index]);
            events = [...events, object];
            count++;
            if (count === countEvents) {
                window.alert("More than 20 events");
                break;
            }
        }

        let dataEvents = this.verifyData(events);
        if (dataEvents === 1 ) {
            return false;
        }
        else {
            let data = this.createChartDataset(dataEvents[0], dataEvents[1], dataEvents[2]);
            this.createChart(data);
            return true;
        }
    }

    verifyData = (events) => {
        /**
         * Second, we verify if the necessary events (start, stop and span)
         * were inserted
         */
        let dataEvents = [];
        let hasStart = false, hasStop = false, hasSpan = false;
        let startPosition = 0, count = 0, stopPosition = 0;
        let timestampBegin, timestampEnd;
        let selectData = [], groupData = [];

        events.forEach(element => {
            if (element.type === 'start') {
                hasStart = true;
                startPosition = count;
                selectData = element.select;
                groupData = element.group;
            }
            if (element.type === 'stop' && hasStart) {
                hasStop = true;
                stopPosition = count;
            }
            if (element.type === 'span' && hasStart) {
                hasSpan = true;
                timestampBegin = element.begin;
                timestampEnd = element.end;
            }
            count += 1;
        });

        if (!hasStart) {
            window.alert("Insert the event with type start");
            return 1;
        }
        if (!hasStop) {
            window.alert("Insert the event with type stop");
            return 1;
        }
        if (!hasSpan) {
            window.alert("Insert the event with type span");
            return 1;
        }
        /**
         * Then, we selected the data from events
         */

        for (let index = startPosition; index < stopPosition; index++) {
            if (events[index].type === 'data' && (events[index].timestamp >= timestampBegin && events[index].timestamp <= timestampEnd))
                dataEvents = [...dataEvents, events[index]];
        }

        return [dataEvents, selectData, groupData];
    }

    createChartDataset = (dataEvents, selectData, groupData) => {
        /**
         * Create the dataset that is used to create the chart
         */

        let data = [];

        /**
         * Function which converts the first char of the string to upper case
         */
        const capitalize = str => {
            if (typeof str != 'string') {
                return '';
            }
            return str.charAt(0).toUpperCase() + str.substr(1) + " ";
        }

        /*
         * Function that creates a random color  
         */

        const getRandomColor = () => {
            let colorArray = []
            for (let index = 0; index < 3; index++) {
                let randomNumber = Math.floor(Math.random() * 255);
                colorArray = [...colorArray, randomNumber];
            }
            let str = `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
            return str;
        }

        /**
         * Here we create a loop for all data events putting it into an object and adding
         * the necessary information to plot the graph
         */
        dataEvents.forEach(element => {
            let dataObject = {};
            let auxListSelect = [];
            let auxLabelList = [];

            let strGroup = "";
            groupData.forEach(group => {
                strGroup += capitalize(element[group]);
            });

            selectData.forEach(select => {
                let strSelect = "";
                strSelect += capitalize(select.replaceAll("_", " "));
                auxListSelect = [...auxListSelect, element[select]];
                auxLabelList = [...auxLabelList, strGroup + strSelect];
            });

            dataObject.label = auxLabelList;
            dataObject.data = auxListSelect;
            dataObject.backgroundColor = "rgb(255, 255, 255)";
            dataObject.borderColor = getRandomColor();
            data = [...data, dataObject];
        });

        return data;
    }

    createChart = (data) => {
    /**
     * Function that creates the graph
     */
        let chartSpace = document.querySelector('#chartSpace');
        let chart = new ChartJS(chartSpace, {
                type: 'line',
                data: {
                    datasets: data
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
        });
    }
}

export default Chart;

// { "type": "start", "timestamp": "1519780251293", "select": ["min_response_time", "max_response_time"], "group": ["os", "browser"] }
// { "type": "span", "timestamp": "1519780251293", "begin": "1519780251293", "end": "1519780260201" }
// { "type": "data", "timestamp": "1519780251000", "os": "linux", "browser": "chrome", "min_response_time": "0.1", "max_response_time": "1.3" }
// { "type": "stop", "timestamp": "1519780251293" }

/*
    { "type": "start", "timestamp": "1519780251293", "select": ["min_response_time", "max_response_time"], "group": ["os", "browser"] }
    { "type": "span", "timestamp": "1519780251293", "begin": "1519780251293", "end": "1519780260201" }
    { "type": "data", "timestamp": "1519780251293", "os": "linux", "browser": "chrome", "min_response_time": "0.1", "max_response_time": "1.3" }
    { "type": "data", "timestamp": "1519780251293", "os": "mac", "browser": "chrome", "min_response_time": "0.2", "max_response_time": "1.2" }
    { "type": "data", "timestamp": "1519780251293", "os": "mac", "browser": "firefox", "min_response_time": "0.3", "max_response_time": "1.2" }
    { "type": "data", "timestamp": "1519780251293", "os": "linux", "browser": "firefox", "min_response_time": "0.1", "max_response_time": "1.0" }
    { "type": "data", "timestamp": "1519780251293", "os": "windows", "browser": "chrome", "min_response_time": "0.2", "max_response_time": "0.9" }
    { "type": "data", "timestamp": "1519780251293", "os": "mac", "browser": "chrome", "min_response_time": "0.1", "max_response_time": "1.0" }
    { "type": "data", "timestamp": "1519780251293", "os": "mac", "browser": "firefox", "min_response_time": "0.2", "max_response_time": "1.1" }
    { "type": "data", "timestamp": "1519780251293", "os": "windows", "browser": "firefox", "min_response_time": "0.3", "max_response_time": "1.4" }
    { "type": "stop", "timestamp": "1519780251293" }
*/