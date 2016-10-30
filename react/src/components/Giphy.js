import React, { Component } from 'react';

class Giphy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      giphy: '',
      source: ''
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'POST',
      url: 'api/randoms',
      data: { choice: 'giphy' }
    })
    .done(data => {
      this.setState({
        giphy: data.data.data.image_url,
        source: data.source
      })
    });
  }

  render() {
    return (
      <div className="random-fact">
      <img src={this.state.giphy} className="giphy"/>

      <div className="source">
        <img src={this.state.source} />
      </div>

      </div>
    );
  }
}

export default Giphy;
