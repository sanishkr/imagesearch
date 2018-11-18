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
    console.log('Logout Button Clicked',this.state);
    // let url = `http://127.0.0.1:8000/api/logout`;
    localStorage.setItem("userToken",null);
    this.setState({"usertoken":null})
    // this.props.history.push("/");
    return <Redirect to={{
      pathname: '/login',
      state: { from: this.props.location }
    }}/>
    //console.log(url);
    // fetch(url,{
    //     method: 'POST',
    //     headers: {'Content-Type':'application/json'},
    //     body: JSON.stringify({
    //         "usertoekn": this.state.usertoken,
    //     })
    // }).then(response=>response.json())
    // .then(jsonObj=>{
    //     if(jsonObj.token){
    //         this.props.UserToken(jsonObj.token)
    //         // this.props.UserLogin({
    //         //     "username": this.state.useremail,
    //         //     "password": this.state.userpwd
    //         // })
    //         console.log("Valid token:",jsonObj.token)
    //         this.setState({"msg":""})
    //         localStorage.setItem('userToken', jsonObj.token);
    //         this.props.history.push("/image");
    //     }
    //     else if(jsonObj.error){
    //         this.setState({"msg":jsonObj.error})
    //         console.log("Error:",jsonObj.error);
    //     }else {
    //         this.setState({"msg":jsonObj})
    //         console.log(jsonObj);
    //     }
    //   });
    }
  render() {
    return (
      <div className="container">
        <div className="row text-center">
          <div className="jumbotron">
            <h1>Mike Image Search!</h1>
            <p>Looking for similar TMs based on Images? Search Here..</p>
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
              <Route path='/' component={Login} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default connect(null,{UserLogout})(App);