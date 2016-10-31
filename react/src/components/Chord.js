import React, { Component } from 'react';

class Chord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chord: '',
      instrument: '',
      tuning: '',
      image: ''
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'POST',
      url: 'api/randoms',
      data: { choice: 'chord' }
    })
    .done(data => {
      let randomChord = data.data.objects[0];
      if (data.data.objects[0] !== undefined) {
        this.setState({
          chord: randomChord.name,
          instrument: randomChord.instrument.name,
          tuning: randomChord.instrument.tuning,
          image: randomChord.image_url
        })
      }
    });
  }

  render() {
    return (
      <div className="chord">
      <h3>{this.state.chord}</h3>
      <img src={this.state.image} className="chord"/><br />
      <p>{this.state.instrument} in {this.state.tuning}</p>
      </div>
    );
  }
}

export default Chord;
