import React, { Component } from 'react';
class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            searchByTitle:"",
        }
    }
    onChange = e =>{
        this.setState({ [e.target.name]: e.target.value });
    }
    onSearch =(e) =>{
        e.preventDefault();
        this.props.searchMovie(this.state.searchByTitle);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSearch}>
                <div className="searchbox field">
                <label htmlFor="searchByTitle">Search By Title: <input id="searchByTitle" type="text" name="searchByTitle" value={this.state.searchByTitle} onChange={this.onChange} />
                    </label>
                    </div>
                </form>
            </div>
        );
    }
}
export default Search;