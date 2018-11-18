import React, { Component } from 'react';
import ImageSearch from './ImageSearch';
import { connect } from 'react-redux';
import MovieItem from './MovieItem';
import { Link } from 'react-router-dom';

class ImageResults extends Component {
    render(){
        return (
            <div>
                <Link to="/fav">Prev Results</Link>
                <ImageSearch/>
                <h3>Image Search results</h3>
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

export default connect(mapStateToProps,null)(ImageResults);