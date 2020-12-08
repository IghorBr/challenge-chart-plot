import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import Chart from './components/Chart/Chart.jsx'

test('no events insert', () => {
  render(<App />);
  const event = "";
  const chart = new Chart();
  const textElement = document.getElementById('userInput');
  textElement.value = event;


  let ret = chart.makeChart();
  expect(ret).toBe(1);
});

test('missing events', () => {
  const chart = new Chart();
  const event = [{ "type": "start", "timestamp": "1519780251293", "select": ["min_response_time", "max_response_time"], "group": ["os", "browser"] },
  { "type": "span", "timestamp": "1519780251293", "begin": "1519780251293", "end": "1519780260201" },
  { "type": "data", "timestamp": "1519780251000", "os": "linux", "browser": "chrome", "min_response_time": "0.1", "max_response_time": "1.3" }];

  let ret = chart.verifyData(event);
  console.log(ret);
  expect(ret).toBe(1);
});