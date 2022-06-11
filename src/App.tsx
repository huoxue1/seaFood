import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Login from "./compent/login";
import Home from "./compent/home";
import Register from "./compent/register";
import Api from "./utils/api"



function App(props:any,states:any) {


  let a = 1;
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(()=>{
    Api.check_login().then(r =>{
      if (r.code !== 200) {
        navigate("/login")
      } else {
        navigate("/home")
      }
    })
  },[a])

  return <>
    <Routes>
      <Route path={"/home"} element={<Home navigate={navigate} location={location}/>}>

      </Route>
      <Route path={"/login"} element={<Login navigate={navigate} location={location}/>}>
      </Route>
      <Route path={"/register"} element={<Register navigate={navigate} location={location}/>}>
      </Route>


    </Routes>
  </>
}




export default App;
