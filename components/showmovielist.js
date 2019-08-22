import React from "react";
import { connect } from "react-redux";
import CardComponent from "./CardComponent";
import Search from "./Search";
import {
  getMovies,
  removeMovie,
  createNewMovie,
  searchMovie,
  editMovie
} from "../redux/actions/index";
import ModalView from "./ModalComponent";

class moviesList extends React.Component {
  state = {
    addMovie: false,
    search: false,
    modalIsOpen:false,
  };

  onAddClick = e => {
    this.setState({
      modalIsOpen:true,
      addMovie: !this.state.addMovie
    });
  };
 
  closeModal =() =>{
    this.setState({addMovie:false});
  } 
  onSearchClick = e => {
    this.setState({
      search: !this.state.search,
     
    });
  };

  componentDidMount() {
    this.props.fetchMovies();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("Props--------", nextProps);
  }

  render() {
    const {
      isLoading,
      movieList,
      createNewMovie,
      searchMovieFromList,
      searchMovieList,
      removeMovie,
      editMovieData
    } = this.props;
    const { addMovie, search,edit} = this.state;

    if (isLoading) {
      return <p>loading...</p>;
    }
    return (
      <React.Fragment>
        <div>
        
        <button onClick={this.onAddClick} className="btn btn-primary">
          {addMovie ? "Cancel" : "Add"}
        </button>
        <span className="mheader">Movies List</span>
        &nbsp;&nbsp;
        <button onClick={this.onSearchClick} className="buttonm btn btn-primary">
          {search ? "Cancel" : "Search"}
        </button>
        </div>
        {addMovie && (
          <ModalView
            modalIsOpen={addMovie}
            closeModal={()=> this.closeModal()}
            closeFormAfterAdding={this.onAddClick}
            createNewMovie={createNewMovie}
          />
        )}
        {search && <Search searchMovie={searchMovieFromList} />}

        <div>
          {search ? (
            searchMovieList.length > 0 ? (
              <div>
                {searchMovieList.map(movie => {
                  const {
                    id,
                    original_title,
                    release_date,
                    vote_average,
                    vote_count,
                    popularity,
                    original_language
                  } = movie;
                  return (
                    <CardComponent
                      key={id}
                      id={id}
                      original_title={original_title}
                      release_date={release_date}
                      vote_average={vote_average}
                      vote_count={vote_count}
                      popularity={popularity}
                      original_language={original_language}
                      removeMovie={removeMovie}
                      edit={edit}
                      editMovieData={editMovieData}
                      
                    />
                  );
                })}
              </div>
            ) : (
            
                movieList.map(movie => {
                  const {
                    id,
                    original_title,
                    release_date,
                    vote_average,
                    vote_count,
                    popularity,
                    original_language
                  } = movie;
                  return (
                    <CardComponent
                      key={id}
                      id={id}
                      original_title={original_title}
                      release_date={release_date}
                      vote_average={vote_average}
                      vote_count={vote_count}
                      popularity={popularity}
                      original_language={original_language}
                      removeMovie={removeMovie}
                      edit={edit}
                      editMovieData={editMovieData}
                     
                    />
                  );
                })
            )
          ) : (
            movieList.map(movie => {
              const {
                id,
                original_title,
                release_date,
                vote_average,
                vote_count,
                popularity,
                original_language
              } = movie;
              return (
                <CardComponent
                  key={id}    
                  id={id}
                  original_title={original_title}
                  release_date={release_date}
                  vote_average={vote_average}
                  vote_count={vote_count}
                  popularity={popularity}
                  original_language={original_language}
                  removeMovie={removeMovie}
                  edit={edit}
                  editMovieData={editMovieData}
                  
                />
              );
            })
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  movieList: state.movie.movieList,
  searchMovieList: state.movie.searchMovieList,
  isLoading: state.movie.isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchMovies: () => dispatch(getMovies()),
  removeMovie: id => dispatch(removeMovie(id)),
  createNewMovie: newMovie => dispatch(createNewMovie(newMovie)),
  searchMovieFromList: sid => dispatch(searchMovie(sid)),
  editMovieData: EditedMovie => dispatch(editMovie(EditedMovie))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(moviesList);
