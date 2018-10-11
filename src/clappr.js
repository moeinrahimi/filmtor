import React, { Component } from 'react';
import Clappr from 'clappr';

export default class ClapprPlayer extends Component {




  componentDidMount = () => {
    this.change(this.props.source);
  }




  change = (source) => {


    this.player = new Clappr.Player({
      parent: this.refs.player,
      source: source,
      width: '100%',
      height: '100%',
      mimeType: "video/mp4",
      hlsjsConfig: {
        enableWorker: true
      }
    });
    console.log(this.player.isPlaying(), 's')
    if (this.player.isPlaying()) {
      console.log('hi')
      return this.player.stop()
    }
    return this.player.play()
  }

  render = () => {
    let { hide } = this.props
    return (
      <div className={hide == true ? 'hidden' : ''}>
        <div className='' ref="player"></div>
      </div>
    );
  }
}
