import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../App';
import { useHistory, useLocation } from 'react-router-dom';
firebase.initializeApp(firebaseConfig)

function Login() {
  const [newUser,setNewUser]=useState(false)
  const [user,setUser]=useState({
    isSignedIn:false,
    newUser:false,
    name:'',
    email:'',
    password:'',
    photo:'',

  });
  const [loggedInUser,setLoggInUser]=useContext(UserContext)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const  provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleSignIn=()=>{
    firebase.auth().signInWithPopup(provider)
    .then(res=>{
      const {displayName,email,photoURL}=res.user;
      const isSignedUser={
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL,
      }
      setUser(isSignedUser)
      console.log(displayName,email,photoURL)
    })
    .catch(err=>{
      console.log(err);
      console.log(err.massege)
    })
  }
  const handleFb=()=>{
    firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  const handleSingOut=()=>{
   firebase.auth().signOut()
   .then(res=>{
     
     const signOut={
       isSignedIn:false,
       name:'',
       photo:'',
       email:'',
       error:'',
       success:false,
     }
     setUser(signOut)
   })
   .catch(err=>{
     console.log(err)
   })
  }
  const handleBlur=(e)=>{
    
    let isFormValid=true;
    if(e.target.name==='email'){
       isFormValid=/\S+@\S+\.\S+/.test(e.target.value)
      

    }
    if(e.target.name==='password'){
      const isPasswordValid=e.target.value.length>6;
      const passwordHasNumber=/\d{1}/.test(e.target.value)

      isFormValid =isPasswordValid && passwordHasNumber;


    }
    if(isFormValid){
      const newUserInfo={...user}
      newUserInfo[e.target.name]= e.target.value;
      setUser(newUserInfo)
    }
  }
  const handleSubmit=(e)=>{
    
      if(newUser && user.email && user.password){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
       .then(res=>{
         const newUserInfo={...user}
         newUserInfo.error='';
         newUserInfo.success=true;
         setUser(newUserInfo)
         
         console.log(res)
       })
        .catch(error=>{
          // Handle Errors here.
          const newUserInfo={...user}
          newUserInfo.error=error.message;
          newUserInfo.success=false;
          setUser(newUserInfo)
          setLoggInUser(newUserInfo)
          history.replace(from)
          updateUserName(user.name)
          
          // ...
        });

      }

      if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email,user.password)
        .then(res=>{
          const newUserInfo={...user}
         newUserInfo.error='';
         newUserInfo.success=true;
         setUser(newUserInfo)
        })
        .catch(function(error) {
          const newUserInfo={...user}
          newUserInfo.error=error.message;
          newUserInfo.success=false;
          setUser(newUserInfo)
          // ...
        });
      }
      e.preventDefault();
  }

  const updateUserName = name=>{

    var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName:name,
  }).then(function() {
   console.log('user name updated successfully')
  }).catch(function(error) {
    console.log(error)
  })
  }

  return (
    <div style={{textAlign:'center'}}>
     {  user.isSignedIn ? <button onClick={handleSingOut}>Sign Out</button>:
     <button onClick={handleSignIn}>Sign In</button>
     }
     <br/>
     {
       <button onClick={handleFb}>Log in using Facebook</button>
     }
      {
        user.isSignedIn && <div>
          <h3>Welcome {user.name}</h3>
           <p>E-mail: {user.email}</p>
           <img src={user.photo} alt=""/>
        </div>
      }
      <br/>
      <br/>
      <h2>Our own Othentacation</h2>
      <input type="checkbox" name="newUser" onChange={()=> setNewUser(!newUser)} id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input name="name" onBlur={handleBlur} type="text" placeholder="Your name"/>}
        <br/>
          <input type="text" name="email" onBlur={handleBlur} required placeholder="Your email"/>
              <br/>
          <input type="password" onBlur={handleBlur} name="password" id="" required placeholder="Your password"/>
              <br/>
          <input type="submit" value={newUser?'Sign up':'Sign In'}/>
      </form>
       <p style={{color:'red'}}>{user.error}</p>
       {user.success && <p style={{color:'green'}}>User {newUser ?"created":'Logged In'} successfully</p>}
    </div>
  );
}

export default Login;
