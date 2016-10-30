import React, { Component } from 'react';
import Apod from './Apod';
import SpaceFact from './SpaceFact';
import Beer from './Beer';
import HorrorMovie from './HorrorMovie';
import Taco from './Taco';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: '',
      content: '',
      city: '',
      region: '',
      country: '',
      latitude: '',
      longitude: '',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      choice: event.target.value
    }), this.props.handleSelect;
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let currentContent;
    if (this.state.choice === 'apod') {
      currentContent = <Apod />
    } else if (this.state.choice === 'movie') {
      currentContent = <HorrorMovie />
    } else if (this.state.choice === 'beer') {
      currentContent = <Beer />
    } else if (this.state.choice === 'space-fact') {
      currentContent = <SpaceFact />
    } else if (this.state.choice === 'taco') {
      currentContent = <Taco />
    }
    this.setState({
      content: currentContent
    });
  }

  componentDidMount() {
    $.ajax({
      url: 'http://ip-api.com/json'
    })
    .done(data => {
      this.setState({
        city: data.city,
        region: data.region,
        country: data.country,
        latitude: data.lat,
        longitude: data.lon,
       })
    });
  }


  render() {
    return (
      <div className="container">
        <div className="location">
          <p>CURRENT LOCATION: {this.state.city}, {this.state.region}, {this.state.country} </p>
        </div>

        <form onSubmit={this.handleFormSubmit}>
          <select value={this.state.choice} onChange={this.handleChange}>
            <option value="">Select...</option>
            <option value="movie">Horror Movie</option>
            <option value="space-fact">Space fact</option>
            <option value="beer">Beer</option>
            <option value="taco">Taco</option>
            <option value="apod">Astronomy Photo of the Day</option>
          </select>

          <input type="submit" value="Randomize" />
        </form>

        <div className="content">
          {this.state.content}
        </div>
      </div>
    );
  }
}

export default App;
