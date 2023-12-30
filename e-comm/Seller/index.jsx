import React from "react";
import styles from './style.module.css';
import {AiOutlineMenu} from 'react-icons/ai';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
export default function Seller()
{
    const [open, setOpen] = useState(false);
    const [data,setData]=useState([]);
    const [name,setName]=useState('');
    const [price,setprice]=useState('');
    const [descrip,setDesc]=useState('');
    const [quantity,setQuantity]=useState('');
    const [file,setFile]=useState(null);
    const [displayedItems, setDisplayedItems] = useState([]);
    const navigate =useNavigate();
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
        const response = await fetch("http://localhost:8000/admin_products", {
          method: "GET",
          headers: { "Content-Type": "application/json",
          "x-access-token": `${t[0]}`}
        });
        if (response.ok) {
          const products = await response.json();
        
          setData(products);
          setDisplayedItems(products.filter(product => product.flag === "R"));
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
  
  async function check() {
    if (
      name.trim() === "" ||
      price.trim() === "" ||
      quantity.trim() === "" ||
      descrip.trim() === "" ||
      !file
    ) {
      swal.fire({
        title: "Please fill out all the fields",
        icon: "warning",
      });
    } else {
      try {
        let t = localStorage.getItem("token");
        t = t.split(":");
        let formData = new FormData();
        formData.append("name", name.trim());
        formData.append("discription", descrip.trim());
        formData.append("price", price.trim());
        formData.append("quantity", quantity.trim());
        formData.append("pic", file);
  
        const response = await fetch("http://localhost:8000/adminproduct", {
          method: "POST",
          headers: {
            "x-access-token": `${t[0]}`,
          },
          body: formData, 
        });
  
        if (response.ok) {
          const products = await response.json();
          console.log(products);
          if (products) {
            swal.fire({
              title: "Item added successfully",
              icon: "success",
            });
            // loaditem(products);
            setDisplayedItems([...displayedItems, ...products.filter(product => product.flag === "R")]);
            setName("");
            setDesc('');
            setFile(null);
            setprice('');
            setQuantity('');
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
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
        <li><Link to="/deleted">Rejected Products</Link></li>
        <li><Link to="/existing">Update Products</Link></li>
       <li> <Link to="/orderrequest">Orders</Link></li>
       
      </div> : <div></div>}
    </div>
        <h1 className={styles.h1}>Welcome Seller</h1>
            <div className={styles.form}>
                <label className={styles.label}>Product Name:</label>
                <input type="text" name="product_name" placeholder="Product Name" id="p_name" className={styles.input} value={name} onChange={(e)=>setName(e.target.value)} required/><br/><br/>
                <label className={styles.label}>Product Discription:</label>
                <input type="text" name="discription" placeholder="Discription" id="dis" className={styles.input} value={descrip} onChange={(e)=>setDesc(e.target.value)}required/><br/><br/>
                <label className={styles.label}>Product Price:</label>
                <input type="number" name="price" placeholder="Price" id="p_price" min="1"  className={styles.input} value={price} onChange={(e)=>setprice(e.target.value)}required/><br/><br/>
                <label className={styles.label}>Product Quantity:</label>
                <input type="number" name="quantity" placeholder="Quantity" id="quan" min="1" className={styles.input} value={quantity} onChange={(e)=>setQuantity(e.target.value)}required/><br/><br/>
                <label className={styles.label}>Product Image:</label><br/><br/>
                <input type="file" name="image" accept=".jpeg,.jpg,.png" id="file_uploads"  className={styles.input}  onChange={(e)=>setFile(e.target.files[0])} required/><br/><br/>
                <input type="button" value="Add Product" className={`${styles.btn} ${styles.input}`} onClick={check}/>
                </div>
                <div className={styles.second}>
          {displayedItems.map((product) => (
            <div key={product.product_id} className={styles.img_div}>
              <img src={`http://localhost:8000/profile/${product.image}`} alt={product.productname} />
              <p>{product.productname}</p>
              <p>{product.price}</p>
            </div>
          ))}
        </div>

                
        </div>
        
        </>
    )
}