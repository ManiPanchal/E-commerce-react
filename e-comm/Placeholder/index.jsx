import { useState } from 'react';
import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import swal from 'sweetalert2';
export default function Placeorder()
{
  const [data,setData]=useState([]);
  const [amount,setAmount]=useState();
  const [placed,setplaced]=useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    const fun = async () => {
      let t=localStorage.getItem("token");
      

      
      try {
        if(t)
        {

        
        t=t.split(":");
        const response = await fetch("http://localhost:8000/postorder", {
          method: "POST",
          headers: { "Content-Type": "application/json" ,
          "x-access-token": `${t[0]}`},
        //   body:JSON.stringify({x:x}),
        });
        if (response) {
          
          const d = await response.json();
          setData(d);
          
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
  
  console.log(data);
  function getuserdata() {
    return data[0] && data[0].map((element, index) => (
      <tr key={index}>
        <td>{element.name}</td>
        <td>{element.email}</td>
        <td>{element.pincode}</td>
        <td>{element.state}</td>
        <td>{element.city}</td>
        <td>{element.phone}</td>
      </tr>
    ));
  }
  function getproducts()
  {
    return data[1] && data[1].map((item, index) => (
      <div className={styles.img_div}>
         <img src={`http://localhost:8000/profile/${item.image}`} alt={item.productname} />
      <p><b>Product</b>:{item.productname}</p>
      <p><b>Price</b>:{item.price}</p>
      <p><b>Quantity</b>:{item.curr_quantity}</p>
      </div>
    ));
  }
  useEffect(() => {
    let a = 0;
    data[1] && data[1].forEach((item, index) => {
      const price = item.price.split(".")[1] * item.curr_quantity;
      a += price;
    });
    setAmount(a);
  }, [data]);
  function viewCart()
  {
      navigate("/view_cart");
  }
  const placeOrder=async()=>
  {
    
    try {
      const response = await fetch("http://localhost:8000/saveto_table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status==402) {
        
        const updateProductResponse = await fetch("http://localhost:8000/update_product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (updateProductResponse.status==402) {
          
          let t=localStorage.getItem("token");
          // console.log(t);
          t=t.split(":");
          const clearCartResponse = await fetch("http://localhost:8000/clear_cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${t[0]}`
            },
            body: JSON.stringify(data),
          });

          if (clearCartResponse.status==402) {
            setplaced(true);
            swal.fire({
              title: 'Order Placed Successfully',
              icon: 'success',
            });
            
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      
    }
      
  
  }
  const backgroundImageStyle = {
    // backgroundImage: 'url("/path-to-your-image.jpg")',
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
    background: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    minHeight:'600px',
    position:'relative',
    // backgroundBlendMode: 'darken'
  };
    return (
        <>
          
          <div style={backgroundImageStyle}>
            <h1 className={styles.h1}>Confirm Order</h1>
            
            <input type="button" value="Back" className={`${styles.body}`} onClick={viewCart} />
            <table className={styles.table}>
            <caption>Information</caption>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Pincode</th>
                <th>State</th>
                <th>City</th>
                <th>Phone Number</th>
                
            </tr>
            {getuserdata()}
        </table>
          
          <div className={styles.main}>
            <h2>Order Details</h2>
            <p>Amount:<span className={styles.amount}>Rs.{amount}</span></p>
            <p className={styles.fr}>Shipping:<span className={styles.free}>Free Shipping</span></p>
            <p>Total Bill:<span className={styles.total}>Rs.{amount}</span></p>
            {placed ? (
   <p  className={styles.para}>
   Your Order Placed Successfully And it will be delivered soon!!
 </p>
) : (
  <button className={styles.btn} onClick={placeOrder}>
    Place Order
  </button>
 
)}
           
          </div>
          <br></br>
          <h2 >Products</h2>
          <div className={styles.pro}>
            {getproducts()}
          </div>
          </div>
        </>
      );
}