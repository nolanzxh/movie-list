import './App.css';
import MovieCard from './components/MovieCard/MovieCard';
import { movies$ } from './movies';
import React from 'react';
import { initiateMovieList, likeMovie, dislikeMovie } from './actions';
import { connect } from 'react-redux';
import Toolbar from './components/Toolbar/Toolbar';

export class App extends React.Component {

  componentDidMount() {
    movies$
      .then((result => {
        this.props.initiateMovieList(result)
      }))
      .catch(
        () => console.error('failed to catch movie list')
      );
  }

  toggleLikeStatus = (movieId) => status => {
    if (status === 'like') {
      this.props.likeMovie(movieId);
    }
    else if (status === 'dislike') {
      this.props.dislikeMovie(movieId);
    }
  }

  render() {
    const { movies, categoriesSelected } = this.props;
    return (
      <div className="App" >
        <Toolbar></Toolbar>
        <div className='cards_container'>
          {movies
            .filter(el => categoriesSelected.length > 0 ? categoriesSelected.indexOf(el.category) !== -1 : true)
            .map((movie) =>
              <MovieCard
                name={movie.title}
                key={movie.id}
                category={movie.category}
                likes={movie.likes}
                dislikes={movie.dislikes}
                id={movie.id}
                toggleLike={this.toggleLikeStatus(movie.id)}
                isLike={movie.isLike}
              />
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies,
  categoriesSelected: state.categoriesSelected
})

export default connect(
  mapStateToProps,
  { initiateMovieList, likeMovie, dislikeMovie }
)(App);
