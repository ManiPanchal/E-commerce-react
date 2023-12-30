import styles from './style.module.css';
import React from "react";
import {AiOutlineMenu} from 'react-icons/ai';
import { Link } from "react-router-dom";
import react, { useContext, useEffect, useState } from 'react';
import Table from './table';
import { useNavigate } from 'react-router-dom';
export default function Managerole()
{
    const [open, setOpen] = useState(false);
    const [sellers,setSeller]=useState([]);
//   const [x,setX]=useState(0);
const navigate =useNavigate();
    const handleOpen = () => {
    setOpen(!open);
  };
  const handleSellerAccepted = (email) => {
    
    setSeller((prevSellers) => prevSellers.filter((seller) => seller.s_email !== email));
  };

  const handleSellerRejected = (email) => {
    
    setSeller((prevSellers) => prevSellers.filter((seller) => seller.s_email !== email));
  };
    const backgroundImageStyle = {
        background: 'white',
        backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    height:'800px',
    position:'relative',
    
      };
      useEffect(() => {
        const fun = async () => {
    
          try {
            const t=localStorage.getItem("token");
            if(t)
            {

            
            const response = await fetch("http://localhost:8000/manage", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            //   body:JSON.stringify({x:x}),
            });
            if (response) {
              const seller = await response.json();
              
            //   let y=x+products.length;
              // console.log(y);
            //   setX(y);
              // console.log(x);
              setSeller(seller);
              console.log(sellers);
            }
          }
          else{
            navigate("/login");
          }
        }
          catch (err) {
            console.log(err);
          }
    
        }
        fun();
      }, [])

      
        return (
            <>
            <div style={backgroundImageStyle}>
            <div className={styles.dropdown}>
          <button  onClick={handleOpen} className={styles.dropbtn}><AiOutlineMenu/></button>
          {open ? <div className={styles.dropdown_content}>
            <li><Link to="/logout">Logout</Link></li>
            <li><Link to="/changepassword">Change Password</Link></li>
            <li><Link to="/admin">Manage Products</Link></li>
          </div> : <div></div>}
        </div>
            <h1 className={styles.margin}>Welcome Admin</h1>
             
             <Table data={sellers} onSellerAccepted={handleSellerAccepted} onSellerRejected={handleSellerRejected}/>
             
            </div>
            </>
        );
}