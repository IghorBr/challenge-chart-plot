import * as React from 'react';
import './style.css';

class Footer extends React.Component {
    render() {
        return (
            <div className='footer'>
                <input type='button' value='Generate chart' onClick={() => this.getEvents()}/>
            </div>);
    }

    getEvents = () => {
        let inputText = document.querySelector('#userInput').value;

        let arrayString = inputText.split('\n');
        this.props.events = []

        arrayString.forEach(element => {
            let object = JSON.parse(element);
            this.props.events = [...this.props.events, object];
        });
    }
}

export default Footer;

// { "type": "start", "timestamp": "1519780251293", "select": ["min_response_time", "max_response_time"], "group": ["os", "browser"] }
// { "type": "span", "timestamp": "1519780251293", "begin": "1519780251293", "end": "1519780260201" }
// { "type": "data", "timestamp": "1519780251000", "os": "linux", "browser": "chrome", "min_response_time": "0.1", "max_response_time": "1.3" }
// { "type": "stop", "timestamp": "1519780251293" }