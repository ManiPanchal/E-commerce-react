import React from "react";
import styles from './style.module.css';
import {AiOutlineMenu} from 'react-icons/ai';
import { Link } from "react-router-dom";
import react, {  useEffect, useState } from 'react';
import Table from './table.jsx';
import Table1 from './table1.jsx';
import { useNavigate } from "react-router-dom";
export default function Admin()
{
    const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
const [requestedData, setRequestedData] = useState([]);
const [acceptedData, setAcceptedData] = useState([]);
const navigate=useNavigate();
//   const [x,setX]=useState(0);
    const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const fun = async () => {

      try {
        const t=localStorage.getItem("token");
        if(t)
        {

        
        const response = await fetch("http://localhost:8000/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        //   body:JSON.stringify({x:x}),
        });
        if (response) {
          const products = await response.json();
          
        //   let y=x+products.length;
          // console.log(y);
        //   setX(y);
          // console.log(x);
          setProduct(products);
          setAcceptedData(products);
          setRequestedData(products);
          console.log(product);
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
  
  const handleProductRejected = (updatedData) => {
    setRequestedData(updatedData);
  };
  
  
  const handleProductAccepted = (updatedRequestedData, acceptedProduct) => {
    // console.log("hello");
    setRequestedData(updatedRequestedData);
    setAcceptedData((prevAcceptedData) => [...prevAcceptedData, acceptedProduct]);
  };
  
  const backgroundImageStyle = {
    
    background: 'white',
    backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
backgroundPosition: 'center',
// height:'490px',
position:'relative',
// backgroundBlendMode: 'darken'
  };
    return (
        <>
        <div style={backgroundImageStyle}>
        <div className={styles.dropdown}>
      <button  onClick={handleOpen} className={styles.dropbtn}><AiOutlineMenu/></button>
      {open ? <div className={styles.dropdown_content}>
        <li><Link to="/logout">Logout</Link></li>
        <li><Link to="/changepassword">Change Password</Link></li>
        <li><Link to="/managerole">Manage Role</Link></li>
      </div> : <div></div>}
    </div>
        <h1 className={styles.margin}>Welcome Admin</h1>
         {/* <Table1 data={requestedData} onProductRejected={handleProductRejected} onProductAccepted={handleProductAccepted}/>
         <Table data={acceptedData} /> */}
          <Table1 data={requestedData} onProductRejected={handleProductRejected} onProductAccepted={handleProductAccepted} />
          <Table data={acceptedData} />

        </div>
        </>
    );
}