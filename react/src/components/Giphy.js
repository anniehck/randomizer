import React, { Component } from 'react';

class Giphy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      giphy: ''
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'POST',
      url: 'api/randoms',
      data: { choice: 'giphy' }
    })
    .done(data => {
      this.setState({ giphy: data.data.data.image_url })
    });
  }

  render() {
    return (
      <div className="random-fact">
      <img src={this.state.giphy} />
      
      </div>
    );
  }
}

export default Giphy;
