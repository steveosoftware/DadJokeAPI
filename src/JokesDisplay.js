import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import './JokesDisplay.scss';

const JOKES_API = 'https://icanhazdadjoke.com/'

class JokesDisplay extends Component {
  static defaultProps = {
    numberOfJokes: 10
  }

  constructor(props){
    super(props);
    this.state = { fetchedJokes: [] }
  }

  async componentDidMount(){
    let jokes = [];
    while(jokes.length < this.props.numberOfJokes){
      const header = {
        headers: {Accept: "application/json"}
      }
      const response = await axios.get(JOKES_API, header);
      jokes.push(response.data.joke)
    }
    this.setState({ fetchedJokes: jokes })
  }


  render(){
    const jokes = this.state.fetchedJokes.map(joke => (
      <Joke joke={joke} />
    ))
    return (
      <div className="JokesList">
        <h1>JokeDisplay</h1>
        <div className="JokesList__jokes">
        {jokes}
        </div>

      </div>
    )
  }
}

export default JokesDisplay;