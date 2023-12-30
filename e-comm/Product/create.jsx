import styles from './style.module.css';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Navigate, createRoutesFromChildren, json } from 'react-router-dom';
export default function Create_item(props)
  {
    const navigate = useNavigate();
    // console.log(props.data);
    const addtocart=async(product_id) => {
      try 
      {
        let t=localStorage.getItem("token");
        if(t)
        {
            t=t.split(":");
          const response = await fetch("http://localhost:8000/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" ,
            "x-access-token": `${t[0]}`
          },
            body: JSON.stringify({ product_id: product_id }),
          });
          if (response.status==402) {
            
              swal.fire({
                title: "Item is already in Cart",
                icon: "warning"
              })
          }
            else if (response.status==403) {
              swal.fire({
                title: "Item added to cart successfully",
                icon: "success"
              })
            }
            else {

              navigate("/login");
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
        
    
    return (
    props.data.map((product) => (
        
      <div key={product.product_id} className={styles.img_div}>
        <img src={`http://localhost:8000/profile/${product.image}`} alt={product.productname} />
        <p>{product.productname}</p>
        <p>{product.price}</p>
        <p style={{ display: 'none' }}>{product.details}</p>
        <span style={product.quantity < 10 ? ({ display: 'block', color: 'red' }) : ({ display: 'none' })}>only {product.quantity} Left!! Hurry Up</span>
        <input
          type="button"
          value="Add To Cart"
          onClick={() => addtocart(product.product_id)}
           />
        <input
          type="button"
          value="View details"
          //  onClick={()=>this.viewProductDetails(product)}
          onClick={() => swal.fire({
            title: "Description",
            text: product.details
          })}
        />
      </div>
    ))
)}
  