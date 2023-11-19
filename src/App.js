// import logo from './logo.svg';
import './App.css';
import React,{Component,useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Display from './Displays.js';
import qs from 'qs';
import $ from 'jquery';
import MovieList from './MovieBase.js';
//import './Bootstrap/bootstrap.css'

class  App extends Component {
 state={
  count:0,
  email:'',
  password:'',
  exists:"",
 };
//  styles={
//   padding:2,
//  };
onchange=(e)=>{
  console.log(e)
  this.setState({email:this.$('#input-mail').value})
  
}
handlechange=(e)=>{
  console.log(e.target.value)
}
$=(q)=>{
  return document.querySelector(q);
}
onsubmit=(e)=>{
  //  console.log("Sucess");
   e.preventDefault()
    // const form=document.querySelector("#login-form");
    // const f=new FormData(form)
    // const values=[...f.entries()]
    // console.log(values);
    // const serial=qs.stringify(values);
    // console.log(serial)
    //console.log($("#login-form").serialize())
    // console.log("Sucesses");
    $.ajax(
      {
        type:"post",
        url:"http://localhost/temp/InsertSend.php",
        data:$("#login-form").serialize(),
      
        sucess:function(e)
        {
          console.log("Sucess")
        },
        error:function(e)
        {
          console.log("Error",e)
        },
        
        
      }
    )
    
    
    //window.location.href="http://localhost/temp/InsertSend.php"
    
}
 render(){
  
  return (
    
    <div className="App">
     
    <div className="containers">
    <form className="form" id="login-form"   onSubmit={this.onsubmit} method="post" >
      <h1 className="panel-heading"> Login Form</h1>
    <div className="form-group">
      <label  for="input-mail" >Email</label>
      <input type="email"  className="form-control" name="email" id="input-mail" required/>
    </div>
    <div className="form-group">
      <label for="input-password">Password</label>
      <input type="password" maxLength={8}  className="form-control" name="password" id="input-password" required/>
    </div>
    <button type="submit"   name="submit" className="btn btn-primary">Submit</button>
    {/* <h1>{this.state.count}</h1> */}
    {/* <Display email={this.state.email}/> */}
   
    </form>
    </div>
    <Display key="1" Email={this.state.email} />
    <MovieList/>
    </div>
  );
 }

}

export default App;
