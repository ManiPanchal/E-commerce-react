import styles from './style.module.css';
import {AiOutlineMenu} from 'react-icons/ai';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import swal from 'sweetalert2';
export default function Report()
{
    const [open, setOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("-- select an option --");
    const [data,setData]=useState([]);
    const [clicked,setClicked]=useState(false);
    // let month;
    const handleOpen = () => {
        setOpen(!open);
      };
      function loaditem() {
        console.log("called");
        if(selectedMonth==="-- select an option --")
        {
            swal.fire({
                title: "Warning",
                text: "Please select a month before searching.",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
        else{

        
        if (data.length === 0) {
            return (
                
                <table className={styles.back}>
                    <caption>Delivered Products</caption>
                    <tr className={`${styles.cell} ${styles.height}`}>
                        {/* ... (existing headers) */}
                        <th>Image</th>
                        <th>Product Id</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                    <tr className={styles.cell}>
                        <td colSpan="6" style={{ color: 'red' }} className={styles.cell}>
                            No Delivered Products
                        </td>
                    </tr>
                </table>
            );
        } else {
            
            return (
                <table className={styles.back}>
                    <caption>Delivered Goods</caption>
                    <tr>
                        <th>Image</th>
                        <th>Product Id</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                    {data
                        .filter((product) => product.state === 'Delivered')
                        .map((product) => {
                            let month = product.city_d;
                            month = month.split(" ");
                            if (month[1] === selectedMonth) {
                                console.log(data);
                                console.log(selectedMonth);
                                return (
                                    <tr key={product.product_id} className={styles.cell}>
                                        {/* ... (existing cells) */}
                                        <td style={{ width: '10%', height: '10%' }} className={styles.cell}>
                                            <img src={`http://localhost:8000/profile/${product.image}`} alt={product.productname} className={styles.img} />
                                        </td>
                                        <td className={styles.cell}>{product.product_id}</td>
                                        <td className={styles.cell}>{product.productname}</td>
                                        <td className={styles.cell}>{product.quantity}</td>
                                        <td className={styles.cell}>{product.price}</td>
                                    
                                    </tr>
                                );
                            } else {
                                return null;
                            }
                            
                        })}
                </table>
                
            );
            
        }
    }
    }
    
    useEffect(() => async () => {
        try {
            let t = localStorage.getItem("token");
            t = t.split(":");
            const response = await fetch("http://localhost:8000/postorderfind", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": `${t[0]}`,
                },
            });
            if (response.ok) {
                const products = await response.json();
                setData(products);
                setClicked(true);
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);
    
    
    
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
       <li> <Link to="/seller">Add Products</Link></li>
      </div> : <div></div>}
    </div>
        <h1 className={styles.h1}>Welcome Seller</h1>
        <div id="Users">
        <table className={styles.back}>
            <caption>Select Month To See Report</caption>
            <tr>
                <th>MONTH</th>
                <th>YEAR</th>
                <th>Search</th>
                
            </tr>
            <tr>
                <td>
                    <select className={styles.select} value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option disabled> -- select an option -- </option>
                        <option value="Jan">Jan</option>
                        <option value="Feb">Feb</option>
                        <option value="March">March</option>
                        <option value="Apr">Apr</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="Aug">Aug</option>
                        <option value="Sept">Sept</option>
                        <option value="Oct">Oct</option>
                        <option value="Nov">Nov</option>
                        <option value="Dec">Dec</option>
                    </select>
                </td>
                <td>
                    2023
                </td>
                <td>
                <button className={styles.search} onClick={loaditem}>
    Search
</button>

                </td>
            </tr>
        </table>
    </div>
    {/* {loaditem()} */}
    {/* {clicked?loaditem():""} */}
    {/* {data.length==0?loaditem1():loaditem()} */}
        </div>
        </>
        )
}