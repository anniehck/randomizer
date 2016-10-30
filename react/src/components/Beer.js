import React, { Component } from 'react';

class Beer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beerName: null,
      beerDesc: null,
      beerAbv: null,
      beerStyle: null,
      beerDate: null,
      beerAvail: null,
      beerLabel: null
    }
  }

  componentDidMount() {

    $.ajax({
      method: 'POST',
      url: 'api/randoms',
      data: { choice: 'beer' }
    })
    .done(data => {
      let beer = data.data.data
      let style;
      let avail;
      if (beer.style === undefined) {
        style = 'N/A';
      } else {
        style = beer.style.category.name;
      }
      if (beer.available === undefined) {
        avail = 'Availability: N/A';
      } else {
        avail = beer.available.description;
      }
      this.setState({
        beerName: beer.name,
        beerAbv: beer.abv,
        beerDesc: beer.description,
        beerStyle: style,
        beerDate: beer.createDate,
        beerAvail: avail,
        beerLabel: beer.labels.medium
       })
    });
  }

  render() {
    return (
      <div>
        <h4 className="title">Random Beer</h4>
        <div className="beer">

          <div className="left">
            <h3>{this.state.beerName}</h3>
                <img src={this.state.beerLabel} />
          </div>

          <div className="right">
            <p><strong>Style:</strong> {this.state.beerStyle} <br />
            <strong>Creation date:</strong> {this.state.beerDate}<br />
            <strong>ABV</strong> {this.state.beerAbv}%
            </p>
            <p>{this.state.beerDesc}</p>
            <p className="avail">{this.state.beerAvail}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Beer;
