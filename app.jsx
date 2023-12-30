import Login from './e-comm/login';
import { useState } from 'react';
import Signup from './e-comm/signup';
import Product from './e-comm/Product';
import {checkAuth} from '../api/auth';
import { createContext,useContext } from 'react';
import {useNavigate} from "react-router-dom";
import Admin from './e-comm/Admin';
import Seller from './e-comm/Seller';
import State from './e-comm/State';
import City from './e-comm/City';
import Managerole from './e-comm/Managerole';
import Changepassword from './e-comm/Changepassword';
import Logout from './e-comm/Logout';
import Cart from './e-comm/Cart';
import UserForm from './e-comm/Userform';
import Placeorder from './e-comm/Placeholder';
import Myorders from './e-comm/Myorders';
import TrackOrder from './e-comm/TrackOrder';
import Forgot from './e-comm/Forgot';
const AuthContext =createContext(); 
// import { 
//     BrowserRouter as Router, 
//     Routes,
//     Route, 
//     Navigate, 
//   } from "react-router-dom"; 
import {Route,Routes} from 'react-router-dom';
  import Home from './e-comm/Home';
import { useEffect } from 'react';
import Signupas_seller from './e-comm/Signupas_seller';
import Rejected from './e-comm/Rejected';
import Update from './e-comm/Update';
import Orderrequest from './e-comm/Orderrequest';
import Report from './e-comm/Report';
import Forgottoken from './e-comm/Forgottoken';
export default function App()
{
    
    return(
        <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route  path="/login" element={<Login/>} > 
        </Route>
        <Route  path="/signup" element={<Signup/>} > 
        </Route>
        <Route path="/products" element={<Product/>}>
        </Route>
        <Route path="/admin" element={<Admin/>}>
        </Route>
        <Route path="/seller" element={<Seller/>}>
        </Route>
        <Route path="/state" element={<State/>}>
        </Route>
        <Route path="/city" element={<City/>}>
        </Route>
        <Route path="/managerole" element={<Managerole/>}>
        </Route>
        <Route path="/changepassword" element={<Changepassword/>}>
        </Route>
        <Route path="/logout" element={<Logout/>}>
        </Route>
        <Route path="/view_cart" element={<Cart/>}>
        </Route>
        <Route path="/buynow" element={<UserForm/>}>
        </Route>
        <Route path="/placeorder" element={<Placeorder/>}>
        </Route>
        <Route path="/myorders" element={<Myorders/>}>
        </Route>
        <Route path="/trackorder/:id" element={<TrackOrder/>}>
        </Route>
        <Route path="/forgot" element={<Forgot/>}>
        </Route>
        <Route path="/signupas_seller" element={<Signupas_seller/>}>
        </Route>
        <Route path="/deleted" element={<Rejected/>}>
        </Route>
        <Route path="/existing" element={<Update/>}>
        </Route>
        <Route path="/orderrequest" element={<Orderrequest/>}>
        </Route>
        <Route path="/report" element={<Report/>}>
        </Route>
        <Route path="/forgot/:token" element={<Forgottoken/>}>
        </Route>
        
    </Routes>
    )
   
    
}