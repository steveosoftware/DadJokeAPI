import React, { Component } from 'react';
import './Joke.scss';


class Joke extends Component {


  render(){
    return (
      <div className="Joke">
        <div className="Joke__buttons">
        <i onClick={this.props.upvote} className="fas fa-arrow-up"></i>
        <span className="Joke__votes">{this.props.votes}</span>
        <i onClick={this.props.downvote} className="fas fa-arrow-down"></i>
        </div>

      <div className="Joke__text">
      {this.props.text}
      </div>

      </div>
    )
  }
}

export default Joke;