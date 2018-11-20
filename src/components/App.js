import React, { Component } from 'react';
import Login from './Login';
// import Logout from './Logout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
  // withRouter
} from 'react-router-dom';
import { UserLogout } from '../actions';
import { connect } from 'react-redux';
import ImageResult from './ImageResult';

class App extends Component {
  constructor(props){
    super(props);
    // if(localStorage.getItem("userToken")==null){
    //   this.props.history.push("/");
    // }else if(localStorage.getItem("userToken")){
    //   this.props.history.push("/image");
    // }
    this.state = {
      usertoken:localStorage.getItem("userToken")
    };
  }
  logout(){
    let token = 'Token '+localStorage.getItem('userToken');
    console.log('Logout Button Clicked',this.state);
    let url = `http://127.0.0.1:8000/api/logout`;
    // this.props.history.push("/");
    // return <Redirect to={{
    //   pathname: '/login',
    //   state: { from: this.props.location }
    // }}/>
    console.log(url);
    fetch(url,{
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization': token
        },
        // body: JSON.stringify({
        //     "usertoken": this.state.usertoken,
        // })
    }).then(response=>response.json())
    .then(jsonObj=>{
        if(jsonObj.success){
            // this.props.UserToken(jsonObj.token)
            localStorage.setItem("userToken",null);
            this.setState({"usertoken":null})
            console.log("Response:",jsonObj.success)
            // this.props.history.push("/login");
            return <Redirect to={{
              pathname: '/login',
              state: { from: this.props.location }
            }}/>
        }
        else if(jsonObj.detail){
            console.log("Error:",jsonObj.detail);
        }else {
            console.log(jsonObj);
        }
      });
    }
  render() {
    return (
      <div className="container">
        <div className="row text-center">
          <div className="jumbotron">
            {/* <h1>Mike Image Search!</h1>
            <p>Looking for similar TMs based on Images? Search Here..</p> */}
          </div>
          {
          localStorage.getItem("userToken")!==null ? 
          <button onClick={()=>this.logout()} type="button" className="logout btn btn-default" aria-label="Left Align">
            <span className="glyphicon glyphicon-log-out" aria-hidden="true"></span>
          </button> : null
          }
        </div>
        <div className="row">
          <Router>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path='/image' component={ImageResult} />
              <Route path='/login' component={Login} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default connect(null,{UserLogout})(App);