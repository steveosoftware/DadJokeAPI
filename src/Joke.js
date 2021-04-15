import React, { Component } from 'react';
import './JokesDisplay.scss';

class Joke extends Component {
  constructor(props){
    super(props);
    this.state = { vote: 0 }
    this.vote = this.vote.bind(this);
  }


  vote(){
    this.setState(st => ({ vote: st.vote + 1 }))
  }

  render(){
    return (
      <div className="Joke">
        <button onClick={this.vote}>{this.state.vote}</button>
        {this.props.joke}
      </div>
    )
  }
}

export default Joke;