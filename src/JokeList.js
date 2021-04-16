import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import './JokeList.scss';
import { v4 as uuidv4 } from 'uuid';

const JOKES_API = 'https://icanhazdadjoke.com/'

class JokeList extends Component {
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
      jokes.push({id: uuidv4(), text: response.data.joke, votes: 0})
    }
    this.setState({ fetchedJokes: jokes })
  }

  handleVote(id, delta){
    this.setState(
      st=> ({
        fetchedJokes: st.fetchedJokes.map(j =>
          j.id === id? {...j, votes: j.votes + delta } : j)
      })
    )
  }

  render(){
    const jokes = this.state.fetchedJokes.map(j => (
      <Joke
        text={j.text}
        votes={j.votes}
        key={j.id}
        upvote={() => this.handleVote(j.id, 1)}
        downvote={() => this.handleVote(j.id, -1)}/>
    ))
    return (
      <div className="JokesList">
        <div className="JokeList__sidebar">
          <h1 className="JokeList__title"><span>Dad</span> Jokes</h1>
          <img
          className="JokeList__image"
          src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="icon"/>
          <button className="JokeList__getmore">New Jokes</button>
        </div>

        <div className="JokeList__jokes">
          {jokes}
        </div>

      </div>
    )
  }
}

export default JokeList;