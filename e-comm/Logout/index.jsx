import React from "react";
import { Link, useNavigate } from "react-router-dom";
import  { useState,useEffect } from 'react';
export default function Logout(){
    const navigate=useNavigate();
    useEffect(() => {
        const fun = async () => {
         let t=localStorage.getItem("token");
         if(t){

         
         t=t.split(":");
         
          try {
            const response = await fetch("http://localhost:8000/logout", {
              method: "POST",
              headers: { "Content-Type": "application/json" ,
            "x-access-token":`${t[0]}`},
            //   body:JSON.stringify({x:x}),
            });
            if (response.status==402) {
                localStorage.clear();
                navigate("/");
            //   const products = await response.json();
              
            //   let y=x+products.length;
              // console.log(y);
            //   setX(y);
              // console.log(x);
            //   setProduct(products);
            //   console.log(product);
            }
            else if(response.status==403){
                navigate("/login");
            }
          }
          catch (err) {
            console.log(err);
          }
        }
        else{
            navigate("/login");
        }
        }

        fun();
      }, [])
    
}