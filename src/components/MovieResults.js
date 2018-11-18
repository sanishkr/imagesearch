import React, { Component } from 'react';
import Search from './Search';
import { connect } from 'react-redux';
import MovieItem from './MovieItem';
import { Link } from 'react-router-dom';

class MovieResults extends Component {
    render(){
        return (
            <div>
                <Link to="/fav">Favorites</Link>
                <Search/>
                <h3>Movie results</h3>
                {this.props.movies.map(item=>{
                    return <MovieItem movie={item} key={item.id} showButton={true} />
                })}
            </div>
        );
    }
}
function mapStateToProps(state){
    console.log(state);
    return {
        movies: state.movies
    }
}

export default connect(mapStateToProps,null)(MovieResults);