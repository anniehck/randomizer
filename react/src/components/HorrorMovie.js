import React, { Component } from 'react';

class HorrorMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: '',
      movieImage: '',
      movieReleased: '',
      movieRating: '',
      movieSummary: '',
      movieLink: ''
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'POST',
      url: 'api/randoms',
      data: { choice: 'movie' }
    })
    .done(data => {
      let index = Math.floor(Math.random() * data.data.results.length);
      let movie_data = data.data.results[index];
      let posterUrl = `https://image.tmdb.org/t/p/w300${movie_data.poster_path}`;
      let movie_link = `https://www.themoviedb.org/movie/${movie_data.id}`;
      this.setState({
        movie: movie_data.original_title,
        movieImage: posterUrl,
        movieReleased: movie_data.release_date,
        movieRating: movie_data.vote_average,
        movieSummary: movie_data.overview,
        movieLink: movie_link})
    });
  }

  render() {
    return (
      <div>
      <h4 className="title">Random horror movie</h4>
        <div className="movie">

          <div className="left">
            <img src={this.state.movieImage} />
          </div>
          <div className="right">
           <h3>{this.state.movie}</h3>
           <p><strong>Release date:</strong> {this.state.movieReleased} <br />
           <strong>Avg rating:</strong> {this.state.movieRating}</p>
           <p>{this.state.movieSummary}</p>
           <p><a href={this.state.movieLink} target="_blank">View details</a></p>
         </div>
        </div>
      </div>

    );
  }
}

export default HorrorMovie;
