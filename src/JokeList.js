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
    this.state = {
      fetchedJokes: JSON.parse(window.localStorage.getItem("jokes")|| "[]"),
      loading: false
   };
    this.seenJokes = new Set(this.state.fetchedJokes.map(j => j.text));
    this.handleClick = this.handleClick.bind(this);
  }

 componentDidMount(){
    if(this.state.fetchedJokes.length === 0) this.getJokes();
  }

async getJokes(){
  try{
    let jokes = [];
    while(jokes.length < this.props.numberOfJokes){
      const header = {
        headers: {Accept: "application/json"}
      }
      const response = await axios.get(JOKES_API, header);
      let newJoke = response.data.joke;
      if(!this.seenJokes.has(newJoke)){
      jokes.push({id: uuidv4(), text: newJoke, votes: 0})
    } else {
      console.log("Found a duplicate");
      console.log(newJoke);
    }
  }
    this.setState(st => ({
      loading: false,
      fetchedJokes: [...st.fetchedJokes, ...jokes]
    }),
    () => window.localStorage.setItem("jokes", JSON.stringify(this.state.fetchedJokes))
    );
   } catch(e){
     alert(e);
     this.setState({loading: false});
   }
  }

  handleVote(id, delta){
    this.setState(
      st=> ({
        fetchedJokes: st.fetchedJokes.map(j =>
          j.id === id? {...j, votes: j.votes + delta } : j)
      }),
      () => window.localStorage.setItem("jokes", JSON.stringify(this.state.fetchedJokes))
    )
  }

  handleClick(){
   this.setState({ loading: true }, this.getJokes);
  }

  render(){
    if(this.state.loading){
      return (
        <div className="JokeList__spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1>Loading...</h1>
        </div>
      )
    }
    let sortedJokes = this.state.fetchedJokes.sort((a,b) => b.votes - a.votes)
    const jokes = sortedJokes.map(j => (
      <Joke
        text={j.text}
        votes={j.votes}
        key={j.id}
        upvote={() => this.handleVote(j.id, 1)}
        downvote={() => this.handleVote(j.id, -1)}/>
    ))
    return (
      <div className="JokeList">
        <div className="Sidebar">
          <h1 className="Sidebar__title">
            <span>Dad</span> Jokes
          </h1>
          <img
          className="Sidebar__image"
          src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="icon"/>
          <button className="Sidebar__getmore" onClick={this.handleClick}>New Jokes</button>
        </div>

        <div className="JokeList__jokes">
          {jokes}
        </div>

      </div>
    )
  }
}

export default JokeList;