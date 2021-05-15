export const initiateMovieList = (movies) => dispatch => {
    dispatch({ type: 'SET_MOVIES', payload: movies })
}

export const deleteMovie = (movieId) => dispatch => {
    dispatch({ type: 'DELETE_MOVIE', payload: movieId })
}

export const likeMovie = (movieId) => dispatch => {
    dispatch({ type: 'LIKE_MOVIE', payload: movieId })
}

export const dislikeMovie = (movieId) => dispatch => {
    dispatch({ type: 'DISLIKE_MOVIE', payload: movieId })
}

export const toggleFilterCatg = (category) => dispatch => {
    dispatch({ type: 'SELECT_CATEGORY', payload: category })
}