import './styles.css';
import * as React from 'react';
import Header from './components/Header/Header.jsx';
import TextEditor from './components/TextEditor/TextEditor.jsx';
import Chart from './components/Chart/Chart.jsx';
// import Footer from './components/Footer/Footer.jsx';

/*
  Principal class of the Aplication
  The class that returns the others components
*/


class App extends React.Component{

  render() {
    return (<div className="page"><Header/><TextEditor/><Chart/></div>);
  }
}

export default App;
