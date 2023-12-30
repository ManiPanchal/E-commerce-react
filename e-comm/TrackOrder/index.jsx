import React, { useEffect, useState } from 'react';
import styles from './style.module.css'; 
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const TrackOrder = () => {
    const navigate=useNavigate();
    const [data,setData]=useState([]);
    const [orderdate,setOrderdate]=useState('');
    const [sellerdate,setSellerdate]=useState('');
    const [statedate,setStatedate]=useState('');
    const [citydate,setCitydate]=useState('');
    const { id } = useParams();
    console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let t=localStorage.getItem("token");
        if(t)
        {

        
          // console.log(t);
          t=t.split(":");
        const response = await fetch('http://localhost:8000/gettrackproduct', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' ,
          "x-access-token": `${t[0]}`},
          body:JSON.stringify({ id })
        });

        if (response.ok) {
          const d = await response.json();
          setData(d);
        }
      }
      else{
        navigate("/login");
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (data.length > 0) {
        if(data[0].order_date){
            const date = data[0].order_date.split('G');
            setOrderdate(date[0]);
        }
      
     if(data[0].seller_d)
     {
        const date2 = data[0].seller_d.split('G');
        setSellerdate(date2[0]);
     }
      
  if(data[0].state_d)
  {
    const date3 = data[0].state_d.split('G');
    setStatedate(date3[0]);
  }
    if(data[0].citydate)
    {
        const date3 = data[0].citydate.split('G');
    setCitydate(date3[0]);
    }  
    }
  }, [data]);
  
  const backgroundImageStyle = {
    
    background: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    minHeight:'600px',
    position:'relative',
    
  };
  function GetOrders()
  {
    navigate("/myorders");
  }
  function Getdata()
  {
    return (
     data.map((product)=>(
        <tr key={product.product_id}>
            <td style={{ width: '10%', height: '10%' }}>
              <img src={`http://localhost:8000/profile/${product.image}`} alt={product.productname} className={styles.img} />
            </td>
            <td>{product.productname}</td>
            <td>{product.price}</td>
            <td>{product.product_id}</td>
            <td>{product.Quantity}</td>
            
        </tr>
     ))
    )
  }
  return (
    <>
      <div style={backgroundImageStyle}>
      
      <input type="button" value="Back" className={`${styles.body}`} onClick={GetOrders} />
      
      <h1 className={styles.h1}>Track Order</h1>
      <div className={styles.container}>
        <ul className={styles.progressbar}>
          <li className={styles.active}>
            Order Placed Successfully<p id="first" className={styles.p}>{orderdate}</p>
          </li>
          <li className={sellerdate ? styles.active : ''}>Dispatched By Seller<p id="second" className={styles.p}>{sellerdate}</p></li>
          <li className={statedate?styles.active:''}>Dispatched By State Dispatcher<p id="third" className={styles.p}>{statedate}</p></li>
          <li className={citydate?styles.active:''}>Delivered</li>
        </ul>
      </div>
      <div id="users">
        <table className={styles.table}>
          <caption>Product Details</caption>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Product Id</th>
              <th>Quantity</th>
              
            </tr>
          </thead>
          <tbody>
            {Getdata()}
           
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
};

export default TrackOrder;
