import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import styles from './style.module.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert2';
export default function Rejected()
{
    const [open, setOpen] = useState(false);
    const [data,setData]=useState([]);
    const navigate=useNavigate();
    const handleOpen = () => {
        setOpen(!open);
      };
      useEffect(() => {
        const fun = async () => {
    
          try {
            let t=localStorage.getItem("token");
            if(t)
            {

            
            t=t.split(":");
            const response = await fetch("http://localhost:8000/getdelproduct", {
              method: "POST",
              headers: { "Content-Type": "application/json",
              "x-access-token": `${t[0]}`}
            });
            if (response.ok) {
              const products = await response.json();
              setData(products);
               console.log(data);
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
      function loaditem()
      {
        return (
        data.map((item) => (
            <tr  className={styles.cell} key={item.product_id} >
                <td style={{ width: '15%' ,height:'15%'}}><img src={`http://localhost:8000/profile/${item.image}`} alt={item.productname} className={styles.img}/>
             </td>
               <td >{item.productname}</td>
              <td >{item.product_id}</td>
               <td >{item.price}</td>
               <td >{item.quantity}</td>
               <td>{item.flag=='D'?"Deleted":"Rejected"}</td>
             </tr>
         ))
        )
      }
    const backgroundImageStyle = {
        background: 'aliceblue',
        backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    // height:'700px',
    position:'relative',
    
      };
    return(
        <>
        <div style={backgroundImageStyle}>
        <div className={styles.dropdown}>
      <button onClick={handleOpen} className={styles.dropbtn}><AiOutlineMenu/></button>
      {open ? <div className={styles.dropdown_content}>
        <li><Link to="/logout">Logout</Link></li>
        <li><Link to="/existing">Update Products</Link></li>
        <li><Link to="/seller">Add Products</Link></li>
       <li> <Link to="/orderrequest">Orders</Link></li>
       {/* <li> <Link to="/report">Orders Report</Link></li> */}
      </div> : <div></div>}
    </div>
        <h1 className={styles.h1}>Welcome Seller</h1>
        <div id="Users">
    <table className={styles.back}>
      <caption>Rejected And Deleted Products</caption>
      <tr>
        <th>Image</th>
        <th>Product Name</th>
        <th>Product ID</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Status</th>
      </tr>
      {loaditem()}
    </table>
  </div>
    </div>
    </>
    )
}
