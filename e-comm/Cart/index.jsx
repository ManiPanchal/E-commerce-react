import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import styles from './style.module.css';
import swal from 'sweetalert2';
export default function Cart()
{
    
    const [cartData, setCartData] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [empty,setEmpty]=useState(false);
    const navigate=useNavigate();
    useEffect(() => {
        
      const fetchData = async () => {
        let t=localStorage.getItem("token");
        if(t)
        {
          t=t.split(":");

        const response = await fetch('http://localhost:8000/create_cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "x-access-token": `${t[0]}`
          },
        });
        const data = await response.json();
  
        if (data.length === 0) {
          
          setEmpty(true);
          
        } else {
          setCartData(data);
          calculateSubTotal(data);
        }
      }
      else{
        navigate("/login");
      }
      };
  
      fetchData();
    }, []);
  
    const calculateSubTotal = (data) => {
      let total = 0;
      data.forEach((item) => {
        total += item.price.split('.')[1] * item.curr_quantity;
      });
      setSubTotal(total);
    };
  
    const view = (item) => {
      swal.fire({
        title: 'Product Details',
        text: `${item.details} for ${item.price}`,
      });
    };
  
    const removeFromCart = async (itemId) => {
      let t=localStorage.getItem("token");
          t=t.split(":");
      const response = await fetch('http://localhost:8000/delete_from_cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": `${t[0]}`
        },
        body: JSON.stringify({ value: itemId }),
      });
  
      if (response.status==402) {
        const updatedCart = cartData.filter((item) => item.product_id !== itemId);
        setCartData(updatedCart);
        calculateSubTotal(updatedCart);
  
        swal.fire({
          title: 'Item removed successfully',
          icon: 'success',
        });
  
        if (updatedCart.length === 0) {
          
          setEmpty(true);
        }
      }
    };
  
    const incrementQuantity = async (itemId, currentQuantity) => {
      let t=localStorage.getItem("token");
          
          t=t.split(":");
      const response = await fetch('http://localhost:8000/plus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": `${t[0]}`
        },
        body: JSON.stringify({ q: currentQuantity + 1, id: itemId }),
      });
  
      if (response.status==401) {
        const updatedCart = cartData.map((item) =>
          item.product_id === itemId ? { ...item, curr_quantity: currentQuantity + 1 } : item
        );
        setCartData(updatedCart);
        calculateSubTotal(updatedCart);
      } else {
        swal.fire({
          title: 'More Quantity is not available',
          icon: 'warning',
        });
      }
    };
  
    const decrementQuantity = async (itemId, currentQuantity) => {
      if (currentQuantity - 1 === 0) {
        swal.fire({
          title: 'Add at least one quantity',
          icon: 'warning',
        });
      } else {
        let t=localStorage.getItem("token");
          // console.log(t);
          t=t.split(":");
        const response = await fetch('http://localhost:8000/minus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "x-access-token": `${t[0]}`
          },
          body: JSON.stringify({ q: currentQuantity - 1, id: itemId }),
        });
  
        if (response.status==402) {
          const updatedCart = cartData.map((item) =>
            item.product_id === itemId ? { ...item, curr_quantity: currentQuantity - 1 } : item
          );
          setCartData(updatedCart);
          calculateSubTotal(updatedCart);
        }
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
  function getproducts(){
    navigate("/products");
  }
  function placeorder()
  {
    navigate("/buynow");
  }
if(empty){
   return (
   <>
   <div style={backgroundImageStyle} >
      <h1 className={styles.h1}>My Cart</h1>
      
        <input type="button" value="Back" className={`${styles.body}`} onClick={getproducts}/>
      
      <div className={styles.cart_prod}>
      <p className={styles.para}>OOPS!!<br></br>Your Cart Is Empty Yet!!!!</p>
      </div>
      </div>
   </>
   )

}
else{
    return (
      <>
      
      <div style={backgroundImageStyle} >
      <h1 className={styles.h1}>My Cart</h1>
      <input type="button" value="Back" className={`${styles.body}`} onClick={getproducts}/>
      <div className={styles.cart_prod}>
        
        {cartData.map((item) => (
          <div key={item.product_id} className={styles.img_div}>
            
            <img src={`http://localhost:8000/profile/${item.image}`} alt={item.productname} />
            <p>{item.productname}</p>
            <p>{item.price}</p>
            <p style={{ display: 'none' }}>{item.details}</p>
            
            <input type="button" className={`${styles.button} ${styles.input}`} value="-" onClick={() => decrementQuantity(item.product_id, item.curr_quantity)} />
            <span className="s">{item.curr_quantity}</span>
            <input type="button" className={`${styles.button} ${styles.input}`} value="+" onClick={() => incrementQuantity(item.product_id, item.curr_quantity)} />
            <input type="button" className={`${styles.button2} ${styles.input}`} value="View Details" onClick={() => view(item)} />
            <input type="button" className={`${styles.button2} ${styles.input}`} value="Remove" onClick={() => removeFromCart(item.product_id)} />
          </div>
        ))}
        
        <p className={styles.amount}>Total: Rs. {subTotal}</p>
        <input type="button" value="Proceed" className={styles.order} onClick={placeorder}/>
        </div>
        </div>
      </>
    );
    }
  };