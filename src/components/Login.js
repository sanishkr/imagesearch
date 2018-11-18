import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserLogin, UserToken } from '../actions';
//import { Link } from 'react-router-dom';
import {Form, FormControl, Button} from 'react-bootstrap';

class Login extends Component{
    login(){
        console.log('Login Button Clicked',this.state);
        let url = `http://127.0.0.1:8000/api/login`;
        //console.log(url);
        fetch(url,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "username": this.state.useremail,
                "password": this.state.userpwd
            })
        }).then(response=>response.json())
        .then(jsonObj=>{
            if(jsonObj.token){
                this.props.UserToken(jsonObj.token)
                // this.props.UserLogin({
                //     "username": this.state.useremail,
                //     "password": this.state.userpwd
                // })
                console.log("Valid token:",jsonObj.token)
                this.setState({"msg":""})
                localStorage.setItem('userToken', jsonObj.token);
                this.props.history.push("/image");
            }
            else if(jsonObj.error){
                this.setState({"msg":jsonObj.error})
                console.log("Error:",jsonObj.error);
            }else {
                this.setState({"msg":jsonObj})
                console.log(jsonObj);
            }
        });
    }
    constructor(props){
        super(props);
        // if(localStorage.getItem("userToken")!==null){
        //     this.props.history.push("/image");
        // }
        this.state = {
            useremail:"",
            userpwd:"",
            msg:""
        };
    }
    render(){
        return(
            <div id="LoginForm">
                <div className="container">
                    <h1 className="form-heading">Login Form</h1>
                    <div className="login-form">
                        <div className="main-div">
                            <div className="panel">
                                <h2>Login Here</h2>
                                <p>Please enter your username and password</p>
                            </div>
                            <Form inline id="Login">
                                <div className="form-group">
                                    <FormControl onChange={(event)=>this.setState({useremail: event.target.value})} type="text" className="form-control" id="inputEmail" placeholder="Username" />
                                </div>
                                <div className="form-group">
                                    <FormControl onChange={(event)=>this.setState({userpwd: event.target.value})} type="password" className="form-control" id="inputPassword" placeholder="Password" />
                                </div>
                                <Button onClick={()=>this.login()} className="btn btn-primary">Login</Button>
                            </Form><br/>
                            {
                                this.state.msg ? <div className="alert alert-danger" role="alert">{this.state.msg}</div> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null,{UserToken,UserLogin})(Login);