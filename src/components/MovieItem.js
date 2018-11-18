import React, { Component } from 'react';
import { addToFavorite,removeFromFavorite } from '../actions';
import { connect } from 'react-redux';

const Image_URL = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
const Movie_URL = "https://www.themoviedb.org/movie/";
class MovieItem extends Component {
    constructor(props){
        super(props);
        this.state={
            favorited:false
        };
    }
    displayFav(){
        if(!this.state.favorited){
            return <span className="glyphicon glyphicon-heart-empty" aria-hidden="true" onClick={()=>this.addToFavorite()} ></span>
        }else{
            return <span className="glyphicon glyphicon-heart" aria-hidden="true"  onClick={()=>this.removeFromFavorite()} ></span>
        }
    }
    addToFavorite(){
        this.setState({favorited:!this.state.favorited});
        this.props.addToFavorite(this.props.movie);
    }
    removeFromFavorite(){
        this.setState({favorited:!this.state.favorited});
        this.props.removeFromFavorite(this.props.movie);
    }
    render(){
        return(
            <div className="col-sm-12 col-md-3">
                <div className="thumbnail">
                    <a href={Movie_URL+this.props.movie.id}><img src={Image_URL+this.props.movie.poster_path} alt={this.props.movie.title+" Image"} /></a>
                    <div className="caption">
                        <h3>{this.props.movie.title}</h3>
                        <p>{this.props.movie.overview.substring(0,100)}...</p>
                        <p>Ratings - <span className="badge badge-default">{this.props.movie.vote_average+' '} 
                        <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                        </span></p>
                        <p>Release Date - {this.props.movie.release_date}</p>
                        <p>{this.props.showButton ? this.displayFav() : null}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null,{addToFavorite,removeFromFavorite})(MovieItem);