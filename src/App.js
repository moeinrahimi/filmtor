import React, { Component } from 'react';
import './App.css';
import ClapprPlayer from './clappr.js';
import Navbar from './components/navbar';
import axios from 'axios'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      url: '',
      hide: true
    }
  }
  componentDidMount = () => {
    axios.get('http://localhost:8080/api/v1/movies')
      .then(data => {
        this.setState({
          movies: data.data.movies
        })
      })
  }
  playMovie = (id) => {

    let url = `http://localhost:8080/api/v1/stream/${id}`
    console.log('d', url)
    this.setState({ url: url, hide: !this.state.hide })
  }

  render() {
    let { movies } = this.state
    return (
      <div className="App">
        <ClapprPlayer source='http://localhost:8080/api/v1/stream/1' hide={this.state.hide} />
        <Navbar />
        <div className="container-fluid">


          <div className="row">
            <div className="col">

              <div className="show-container">
                {movies.map(movie => {
                  return (

                    <div key={movie.id} className="show-cover" onClick={e => this.playMovie(movie.id)}>
                      <img src={movie.poster} className="show-image" />
                    </div>
                  )
                })}

              </div>

            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
