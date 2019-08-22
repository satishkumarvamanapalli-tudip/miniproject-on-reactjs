const initialState = {
  movieList: [],
  searchMovieList: [],
  isLoading: true
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true
      };
    case "GET_MOVIES": {
      return {
        ...state,
        movieList: action.response.results,
        isLoading: false
      };
    }
    case "CREATE_NEW_MOVIE": {
      let tempMovieList = [...state.movieList];
      tempMovieList.unshift(action.response);
      return {
        ...state,
        movieList: tempMovieList
      };
    }
    case "REMOVE_MOVIE": {
      return {
        ...state,
        movieList: state.movieList.filter(movie => movie.id !== action.response)
      };
    }
    case "SEARCH_MOVIE": {
      let searchmovies = state.movieList.filter(movie =>
        (((movie.original_title).toLowerCase()).includes((action.response).toLowerCase())))
        if(searchmovies.length>0){
      return {
        ...state,
        searchMovieList: searchmovies
      };
    }
    else{
      alert("data not found");
      return{
        ...state,
      };
    }
    }
    case "EDIT_MOVIE": {
      return {
        ...state,
        movieList:state.movieList.map(movie => {
          return movie.id === action.response.id ? action.response : movie;
        })
      };
    }

    default:
      break;
  }
  return state;
};
export default movieReducer;
