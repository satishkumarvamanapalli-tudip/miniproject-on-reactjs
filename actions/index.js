import axios from "axios";

export const getMovies = () => {
  return dispatch => {
    dispatch({ type: "LOADING" });
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=c2e3bac276977d104e287f26135466a2&sort_by=popularity.desc"
      )
      .then(response => {
        console.log("data loaded");
        dispatch({ type: "GET_MOVIES", response: response.data });
      })
      .catch(error => {
        //dispatch({type:"error", reponse: error.reponse})
        alert("failed to fetch the url from the API calls");
      });
  };
};

export const createNewMovie = newMovie => {
  return dispatch => {
    dispatch({
      type: "CREATE_NEW_MOVIE",
      response: newMovie
    });
  };
};

export const removeMovie = id => {
  return dispatch => {
    dispatch({
      type: "REMOVE_MOVIE",
      response: id
    });
  };
};

export const searchMovie = sid => {
  console.log("action ...................", sid);
  return dispatch => {
    dispatch({
      type: "SEARCH_MOVIE",
      response: sid
    });
  };
};
export const editMovie = EditedMovie => {
    console.log("action.........",EditedMovie);
  return dispatch => {
    dispatch({
      type: "EDIT_MOVIE",
      response: EditedMovie
    });
  };
};
