import React, { Component } from 'react';
import './App.css';
// import ClapprPlayer from './clappr.js';
import Clappr from 'clappr';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      player : ''
    }
  }
  componentDidMount = () => {
    this.player = new Clappr.Player({
      parent: this.refs.player,
      autoPlay : true,
      source: 'http://techslides.com/demos/sample-videos/small.mp4',
      width: '640px',
      height: '360px',
      hlsjsConfig: {
        enableWorker: true
      }
    });
    this.player.play()
    console.log(this.player,this.refs.player)
  }
  
  render() {
    return (
      <div className="App">
 
        
        <div ref="player" id="player"></div>

      </div>
    );
  }
}

export default App;
