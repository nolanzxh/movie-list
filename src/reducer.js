export function rootReducer(state, action) {
    let movieId = null;
    let categorySelected = null;
    let newMovies = [];

    switch (action.type) {
        case 'SET_MOVIES':
            return { ...state, movies: action.payload }
        case 'DELETE_MOVIE':
            movieId = action.payload
            state.movies.forEach(element => {
                if (element.id !== movieId)
                    newMovies.push(element)
            })
            return { ...state, movies: newMovies }
        case 'LIKE_MOVIE':
            movieId = action.payload;
            state.movies.forEach(element => {
                if (element.id === movieId) {
                    if (element.isLike === true)
                        newMovies.push({ ...element, likes: element.likes - 1, isLike: null })
                    else if (element.isLike === false)
                        newMovies.push({ ...element, likes: element.likes + 1, dislikes: element.dislikes - 1, isLike: true })
                    else
                        newMovies.push({ ...element, likes: element.likes + 1, isLike: true })
                }
                else
                    newMovies.push(element)
            })
            return { ...state, movies: newMovies }
        case 'DISLIKE_MOVIE':
            movieId = action.payload;
            state.movies.forEach(element => {
                if (element.id === movieId) {
                    if (element.isLike === false)
                        newMovies.push({ ...element, dislikes: element.dislikes - 1, isLike: null })
                    else if (element.isLike === true)
                        newMovies.push({ ...element, likes: element.likes - 1, dislikes: element.dislikes + 1, isLike: false })
                    else
                        newMovies.push({ ...element, dislikes: element.dislikes + 1, isLike: false })
                }
                else
                    newMovies.push(element)
            })
            return { ...state, movies: newMovies }
        case 'SELECT_CATEGORY':
            categorySelected = action.payload
            if (state.categoriesSelected.indexOf(categorySelected) === -1)
                return { ...state, categoriesSelected: [...state.categoriesSelected, categorySelected] }
            else {
                let newCategories = state.categoriesSelected.slice()
                newCategories.splice(state.categoriesSelected.indexOf(categorySelected), 1)
                return { ...state, categoriesSelected: newCategories }
            }
        default:
            return state;
    }
}