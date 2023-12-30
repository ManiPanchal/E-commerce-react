import React from "react";
import styles from './style.module.css';
import {AiOutlineMenu} from 'react-icons/ai';
import { useState } from "react";
import { Link, json } from "react-router-dom";
import { useEffect } from "react";
import swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
export default function Orderrequest()
{
  const navigate=useNavigate();
    const [open, setOpen] = useState(false);
    const [data,setData]=useState([]);
    const [confirmationStatus, setConfirmationStatus] = useState({});
  const [buttonText, setButtonText] = useState({});
  
  const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let t=localStorage.getItem("token");
          // console.log(t);
          if(t)
          {

          
          t=t.split(":");
        const response = await fetch("http://localhost:8000/getlast", {
          method: "POST",
          headers: { "Content-Type": "application/json",
          "x-access-token": `${t[0]}` },
        });
        
        if (response) {
          const result = await response.json();
          setData(result);
          console.log(result);
        }
        else if(response.status==401)
        {
            navigate("/login");
        }
      }
      else{
        navigate("/login");
      }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  function loaditem1() {
    const orderedProducts = data.filter((product) => product.state === 'Dispatched By State Dispatcher');
  
    if (orderedProducts.length === 0) {
      return (
        <tr>
          <td colSpan="5" className={styles.noOrders}>
            No Orders Request
          </td>
        </tr>
      );
    }
  
    return orderedProducts.map((product) => (
      <tr key={product.product_id}>
        <td style={{ width: '10%', height: '10%' }}>
          <img
            src={`http://localhost:8000/profile/${product.image}`}
            alt={product.productname}
            className={styles.img}
          />
        </td>
        <td>{product.product_id}</td>
        <td>{product.Quantity}</td>
        <td>{product.email}</td>
        <td>
          <button
            disabled={confirmationStatus[product.product_id]}
            className={
              confirmationStatus[product.product_id]
                ? styles.dis
                : styles.bttn
            }
            onClick={() => dispatch(product.product_id, product.email)}
          >
            {buttonText[product.product_id] || "Dispatch"}
          </button>
        </td>
      </tr>
    ));
  }
  
  async function dispatch(id, email) {
    try {
      let t = localStorage.getItem("token");
      if(t)
      {

      
      t = t.split(":");
      const response = await fetch("http://localhost:8000/delivered", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${t[0]}`,
        },
        body: JSON.stringify({ id: id, email: email }),
      });
  
      if (response.ok) {
        
        setButtonText((prevButtonText) => ({
          ...prevButtonText,
          [id]: "Dispatched",
        }));
        setConfirmationStatus((prevStatus) => ({
          ...prevStatus,
          [id]: true,
        }));
  
        swal.fire({
          title: "Product Dispatched Successfully",
          icon: "success",
        });
      }
    }
    else{
      navigate("/login");
    }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  function loaditem2()
  {
    return (
        data.filter((product) => product.state === "Delivered" )
        .map((product)=>(
           <tr key={product.product_id}>
           <td style={{ width: '10%' ,height:'10%'}}>
               <img src={`http://localhost:8000/profile/${product.image}`} alt={product.productname} className={styles.img}/>
             </td>
             {/* <td>{product.productname}</td> */}
             <td>{product.product_id}</td>
             <td>{product.Quantity}</td>
             <td>{product.email}</td>
             <td>{product.state}</td>
             
             </tr>
                ))
       )
  }
    const backgroundImageStyle = {
        background: 'white',
        backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    height:'700px',
    position:'relative',
    
      };
    return(
        <>
        
        <div style={backgroundImageStyle}>
        <div className={styles.dropdown}>
      <button onClick={handleOpen} className={styles.dropbtn}><AiOutlineMenu/></button>
      {open ? <div className={styles.dropdown_content}>
        <li><Link to="/logout">Logout</Link></li>
        
      </div> : <div></div>}
    </div>
        <h1 className={styles.h1}>Welcome </h1>
        
      <table className={styles.back}>
        <caption>Orders Request</caption>
        <tr>
          <th>Image</th>
          <th>Product Id</th>
          <th>Quantity</th>
          <th>User email</th>
          <th>Option</th>
        </tr>
        {loaditem1()}
      </table>
    
    
      <table className={styles.back}>
        <caption>Dispatched Products</caption>
        <tr>
          <th>Image</th>
          <th>Product Id</th>
          <th>Quantity</th>
          <th>User email</th>
          <th>State</th>
        </tr>
        {loaditem2()}
      </table>
    </div>
          
          </>
    )
}