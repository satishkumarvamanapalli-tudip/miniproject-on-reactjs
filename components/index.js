import React from "react";
import moviesList from "./showmovielist.js";
import { Route, Link, BrowserRouter } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div
            className="b2"
          >
            <h1 className="b3">
              Movies Store 
              <Link to="/MovieList" className="b4">
                Movies List
              </Link>
            </h1>
          </div>
          <Route path="/MovieList" component={moviesList} />
        </BrowserRouter>
      </div>
    );
  }
}

export default Home;
