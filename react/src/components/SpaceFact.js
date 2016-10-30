import React, { Component } from 'react';

class SpaceFact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randFact: ''
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'POST',
      url: 'api/randoms',
      data: { choice: 'space-fact' }
    })
    .done(data => {
      let index = Math.floor(Math.random() * data.data.length);
      this.setState({ randFact: data.data[index].name })
    });
  }

  render() {
    return (
      <div className="random-fact">
      <h4 className="title">"{this.state.randFact}"</h4>
      </div>
    );
  }
}

export default SpaceFact;
