import './App.css';
import MovieCard from './components/MovieCard/MovieCard';
import { movies$ } from './movies';
import React from 'react';
import { initiateMovieList, likeMovie, dislikeMovie } from './actions';
import { connect } from 'react-redux';
import Toolbar from './components/Toolbar/Toolbar';
import ReactPaginate from 'react-paginate';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      perPage: 4
    }
  }

  componentDidMount() {
    movies$
      .then((result => {
        this.props.initiateMovieList(result)
      }))
      .catch(
        () => console.error('failed to catch movie list')
      );
  }

  handlePageClick = (page) => {
    this.setState({ currentPage: page.selected })
  }

  handlePerPageChange = (e) => {
    this.setState({ perPage: e.target.value, currentPage: 0 })
  }

  toggleLikeStatus = (movieId) => status => {
    if (status === 'like') {
      this.props.likeMovie(movieId)
    }
    else if (status === 'dislike') {
      this.props.dislikeMovie(movieId)
    }
  }

  rollbackToFirstPage() {
    this.setState({ currentPage: 0 })
  }

  render() {
    const { movies, categoriesSelected } = this.props
    const { perPage, currentPage } = this.state

    const filteredMovies = movies.filter(el => categoriesSelected.length > 0 ? categoriesSelected.indexOf(el.category) !== -1 : true)
    let offset = currentPage * perPage

    if (offset > filteredMovies.length)
      this.rollbackToFirstPage();

    let pageCount = Math.ceil(filteredMovies.length / perPage)
    const currentPageMovies = filteredMovies.slice(offset, parseInt(offset) + parseInt(perPage))

    return (
      <div className="App" >
        <h1>Movie list</h1>
        <Toolbar />
        <div className='cards_container'>
          {currentPageMovies
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
        <div className='pagination_container'>
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            pageCount={pageCount}
            onPageChange={this.handlePageClick}
            containerClassName="pagination"
            previousLinkClassName="previousBtn"
            nextLinkClassName="nextBtn"
            activeClassName="paginationActive"
            disabledClassName="paginationDisabled"
            forcePage={currentPage}
          />
          <div className='perpage_container'>
            <InputLabel>Per page</InputLabel>
            <Select
              native
              onChange={this.handlePerPageChange}
              value={perPage}
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
            </Select>
          </div>
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
