import React, { useEffect, useState } from 'react';
import swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './style.module.css'


const Myorders = () => {
  const [data, setData] = useState([]);
  // const [isCancelled, setIsCancelled] = useState(false);
  const [cancelledStatus, setCancelledStatus] = useState({});
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let t=localStorage.getItem("token");
        if(t)
        {

        
          // console.log(t);
          t=t.split(":");
        const response = await fetch("http://localhost:8000/myorders", {
          method: "POST",
          headers: { "Content-Type": "application/json",
          "x-access-token": `${t[0]}` },
        });
        
        if (response) {
          const result = await response.json();
          setData(result);
          console.log(data);
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

  const cancelOrder = async (id, q) => {
    const result = await swal.fire({
      title: 'Are You Sure?',
      icon: 'warning',
      showCancelButton: true,
      buttons: ['No', 'Yes'],
      dangerMode: true,
    });

    if (result.isConfirmed) {
      try {
        let t=localStorage.getItem("token");
          // console.log(t);
          t=t.split(":");
        const response = await fetch('http://localhost:8000/cancelorder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' ,
          "x-access-token": `${t[0]}`},
          body: JSON.stringify({ id, q }),
        });

        if (response.status === 402) {
          // setIsCancelled(true);
          setCancelledStatus((prevStatus) => ({
            ...prevStatus,
            [id]: true,
          }));
          swal.fire({
            title: 'Order Canceled Successfully',
            icon: 'success',
          });
          // setIsCancelled(false);
        }
      } catch (error) {
        console.error('Error canceling order:', error);
      }
    }
  };

  const trackOrder = async (id) => {
    navigate(`/trackorder/${id}`);
  };
  function GetProduct()
  {
    navigate("/products");
  }
  function products()
  {
    return (
     data.filter((product) => product.state !== 'Delivered' && product.state!=="Cancelled")
     .map((product)=>(
        <tr key={product.product_id}>
        <td style={{ width: '10%' ,height:'10%'}}>
            <img src={`http://localhost:8000/profile/${product.image}`} alt={product.productname} className={styles.img}/>
          </td>
          <td>{product.productname}</td>
          <td>{product.Quantity}</td>
          <td>{product.product_id}</td>
          <td>{product.price}</td>
          <td>{formatDate(product.order_date)}</td>
          <td>
            <input type="button" value="Track Order" onClick={() => trackOrder(product.product_id)}/>
            <button
            onClick={() => cancelOrder(product.product_id, product.quantity)}
      disabled={cancelledStatus[product.product_id]}
      style={{ backgroundColor: cancelledStatus[product.product_id] ? 'orange' : 'rgb(212, 87, 87)' }}
      className={styles.danger}
    >
      {cancelledStatus[product.product_id] ? 'Cancelled' : 'Cancel Order'}
    </button>
            {/* <input type="button" value="Cancel Order" className={styles.danger} onClick={() => cancelOrder(product.product_id, product.quantity)}/> */}
          </td>
          
          </tr>
             ))
    )
  };
  function cancelproduct()
  {
    return (
      data.filter((product) => product.state==="Cancelled")
      .map((product)=>(
         <tr key={product.product_id}>
         <td style={{ width: '10%' ,height:'10%'}}>
             <img src={`http://localhost:8000/profile/${product.image}`} alt={product.productname} className={styles.img}/>
           </td>
           <td>{product.productname}</td>
           <td>{product.Quantity}</td>
           <td>{product.product_id}</td>
           <td>{product.price}</td>
           <td>{formatDate(product.order_date)}</td>
           <td>
             {/* <input type="button" value="Track Order" onClick={() => trackOrder(product.product_id)}/> */}
             <button
            //  onClick={() => cancelOrder(product.product_id, product.quantity)}
       disabled={true}
       style={{ backgroundColor:  'orange' }}
       className={styles.danger}
     >
       {' Cancelled'} 
     </button>
             {/* <input type="button" value="Cancel Order" className={styles.danger} onClick={() => cancelOrder(product.product_id, product.quantity)}/> */}
           </td>
           
           </tr>
              ))
     )
  }
  function deliveredProducts() {
    return (
      data.filter((product) => product.state === 'Delivered')
        .map((product) => (
          <tr key={product.product_id}>
            <td style={{ width: '10%', height: '10%' }}>
              <img src={`http://localhost:8000/profile/${product.image}`} alt={product.productname} className={styles.img} />
            </td>
            <td>{product.productname}</td>
            <td>{product.Quantity}</td>
            <td>{product.product_id}</td>
            <td>{product.price}</td>
            <td>{formatDate(product.city_d)}</td>
            
            <td>
            </td>
          </tr>
        ))
    );
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString(); 
  }
  const backgroundImageStyle = {
    background: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    minHeight:'600px',
    position:'relative',
  };
  return (
    <div style={backgroundImageStyle}>
        <h1 className={styles.h1}>MY ORDERS</h1>
        <input type="button" value="Back" className={`${styles.body}`} onClick={GetProduct} />
      
      {data.length > 0 ? (
        <div>
          <table className={styles.table}>
            <caption>My Orders</caption>
            <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Product Id</th>
                <th>Price</th>
                <th>Order Date</th>
                <th>Options</th>
            </tr>
            {products()}
            {cancelproduct()}
          </table>
        </div>
        
      ) : (
        <div className={styles.noorders}>
          <h2>OPPS!!!</h2>
          <h2>No Orders Yet!!!</h2>
        </div>
      )}
       {data.some(product => product.state === 'Delivered') ? (
      <div>
        
        <table className={styles.table}>
          <caption>Delivered Products</caption>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Product Id</th>
            <th>Price</th>
            <th>Delivered On</th>
          </tr>
          {deliveredProducts()}
        </table>
      </div>
    ) : null}
  </div>
    
  );
};
export default Myorders;

