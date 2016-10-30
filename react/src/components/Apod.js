import React, { Component } from 'react';

class Apod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: null,
      date: null,
      title: null,
      explanation: ''
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'POST',
      url: 'api/randoms',
      data: { choice: 'apod' }
    })
    .done(data => {
      this.setState({
        photoUrl: data.data.url,
        title: data.data.title,
        date: data.data.date,
        explanation: data.data.explanation })
    });
  }

  render() {
    return (
      <div className="apod">
        <h4>Astronomy Picture of the Day</h4>
        <h3>{this.state.title}</h3>
        <p>{this.state.date}</p>
        <img src={this.state.photoUrl} className="apod-photo"/>
        <p>{this.state.explanation}</p>
      </div>
    );
  }
}

export default Apod;
