import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import './JokesDisplay.scss';

const JOKES_API = 'https://icanhazdadjoke.com/'

class JokesDisplay extends Component {
  constructor(props){
    super(props);
    this.state = { fetchedJokes: [] }
  }

  async componentDidMount(){
    const header = {
      headers: {Accept: "application/json"}
    }
    const response = await axios.get(JOKES_API, header);
    console.log(response.data.joke)
    this.setState(st => (
      { ...st.fetchedJokes, fetchedJokes: response.data.joke}))
  }


  render(){
    return (
      <div className="JokesDisplay">
        <h1>JokesDisplay</h1>
      </div>
    )
  }
}

export default JokesDisplay;