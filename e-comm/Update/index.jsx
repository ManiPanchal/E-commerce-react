import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import styles from './style.module.css';
import { useEffect } from "react";
import swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
export default function Update()
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
            const response = await fetch("http://localhost:8000/admin_products", {
              method: "GET",
              headers: { "Content-Type": "application/json",
              "x-access-token": `${t[0]}`}
            });
            if (response.ok) {
              const products = await response.json();
            
              setData((prevData) => {
                console.log(prevData);
                return products;
              });
            
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
      const updateItem = async (id, itemName, itemDesc, itemPrice, itemQuantity) => {
        try {
          let t = localStorage.getItem("token");
          t = t.split(":");
          const response = await fetch("http://localhost:8000/updateproduct", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${t[0]}`,
            },
            body: JSON.stringify({
              id: id,
              productname: itemName,
              discription: itemDesc,
              price: itemPrice,
              quantity: itemQuantity,
            })
          });
          if (response.ok) {
            swal.fire({
              title: "Item updated successfully",
              icon: "success"
            })
          }
        } catch (err) {
          console.log(err);
        }
      };
      async function deleteitem(id)
      {
        try {
            let t = localStorage.getItem("token");
            t = t.split(":");
            const response = await fetch("http://localhost:8000/deleteproduct", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-access-token": `${t[0]}`,
              },
              body: JSON.stringify({
                id: id
              })
            });
            if (response.ok) {
                setData((prevData) => prevData.filter((item) => item.product_id !== id));
              swal.fire({
                title: "Item Deleted successfully",
                icon: "success"
              })
            }
          } catch (err) {
            console.log(err);
          }
      }
      function loaditem() {
        console.log("load called");
        return (data
          .filter((product) => product.flag === 'A')
          .map((product) => 
            <div key={product.product_id} className={styles.img_div}>
              <img src={`http://localhost:8000/profile/${product.image}`} alt={product.productname} />
              <label className={styles.label}>Name:</label><input type="text" className={styles.input} value={product.productname} onChange={(e) => setData((prevData) => {
                    const newData = [...prevData];
                    newData[newData.findIndex((item) => item.product_id === product.product_id)].productname = e.target.value;
                    return newData;
                  })}/>
              <label className={styles.label}>Price:</label><input type="text" className={styles.input} value={product.price} onChange={(e) => setData((prevData) => {
                    const newData = [...prevData];
                    newData[newData.findIndex((item) => item.product_id === product.product_id)].price = e.target.value;
                    return newData;
                  })}/>
              <label className={styles.label}>Description:</label><input type="text" className={styles.input} value={product.details} onChange={(e) => setData((prevData) => {
                    const newData = [...prevData];
                    newData[newData.findIndex((item) => item.product_id === product.product_id)].details = e.target.value;
                    return newData;
                  })}/>
              <label className={styles.label}>Quantity:</label><input type="text" className={styles.input} value={product.quantity} onChange={(e) => setData((prevData) => {
                    const newData = [...prevData];
                    newData[newData.findIndex((item) => item.product_id === product.product_id)].quantity = e.target.value;
                    return newData;
                  })}/>
              
              <input
                type="button"
                value="Update"
                className={`${styles.btn} ${styles.float}`}
                onClick={() => updateItem(product.product_id, product.productname, product.details, product.price, product.quantity)}              />
              <input
                type="button"
                value="Delete"
                className={styles.btn}
                onClick={() => deleteitem(product.product_id)}
              />
            </div>
          )
        )
      }
      
    const backgroundImageStyle = {
        background: 'aliceblue',
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
        <li><Link to="/seller">Add Products</Link></li>
       <li> <Link to="/orderrequest">Orders</Link></li>
       {/* <li> <Link to="/report">Orders Report</Link></li> */}
      </div> : <div></div>}
    </div>
        <h1 className={styles.h1}>Welcome Seller</h1>
        <div className={styles.second}>
            {loaditem()}
        </div>
    </div>
    </>
    )
}