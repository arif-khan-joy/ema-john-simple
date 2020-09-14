import React, { createContext, useState } from 'react';
import './App.css';
import Header from './componants/Header/Header';
import Market from './componants/Market/Market';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; 
import Review from './componants/Review/Review';
import Manage from './componants/Manage/Manage';
import NotFound from './componants/NotFound/NotFound';
import Detail from './componants/Detail/Detail';
import Shepment from './Shepment/Shepment';
import Login from './Login/Login';
import PrivateRoute from './componants/PrivateRoute/PrivateRoute';

export const UserContext=createContext()

function App() {
   const [loggedInUser,setLoggInUser]=useState({});
  return (
    <UserContext.Provider value ={[loggedInUser,setLoggInUser]}>
       <h3>{loggedInUser.email}</h3>
   
     
     

  <Router>
  <Header></Header>
    <Switch>
       <Route path="/shop">
       <Market></Market>
       </Route>
       <Route path="/review">
          <Review></Review>
       </Route>
       <PrivateRoute path="/manage">
          <Manage></Manage>
       </PrivateRoute>
       <PrivateRoute path="/shepment">
            <Shepment></Shepment>
       </PrivateRoute>
       <Route path="/login">
            <Login></Login>
       </Route>
       <Route exact path="/">
       <Market></Market>
       </Route>
       <Route path="/product/:productKey">
          <Detail></Detail>
       </Route>
       <Route path="*">
          <NotFound></NotFound>
       </Route>

    </Switch>
  </Router>
    

    </UserContext.Provider>
  );
}

export default App;
