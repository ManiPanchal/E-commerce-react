import { useState } from 'react';
import styles from './style.module.css';
import swal from 'sweetalert2';
export default function Table(props)
{
  
  const [confirmationStatus, setConfirmationStatus] = useState({});
  const [buttonText, setButtonText] = useState({});

    const acceptedProducts = props.data
      .filter((product) => product.flag === 'A')
      .map((product) => (
        <tr key={product.product_id} className={styles.cell}>
          <td style={{ width: '10%' ,height:'10%'}}className={styles.cell}>
            <img src={`http://localhost:8000/profile/${product.image}`} alt={product.productname} className={styles.img}/>
          </td>
          <td className={styles.cell}>{product.product_id}</td>
          <td className={styles.cell}>{product.productname}</td>
          <td className={styles.cell}>{product.price}</td>
          <td className={styles.cell}>{product.quantity}</td>
          <td style={{ width: '30%' }} className={styles.cell}>
            <button disabled={confirmationStatus[product.product_id]}
            className={
              confirmationStatus[product.product_id]
                ? styles.dis
                : styles.danger} onClick={(e) =>{
              swal.fire({
                title: 'Are you sure?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No',
                customClass: {
                  actions: 'my-actions',
                  cancelButton: 'order-1 right-gap',
                  confirmButton: 'order-2',
                  denyButton: 'order-3',
                },
              })
              
                .then(
                  function (result) {
                    if (result.isConfirmed) {
                      
                      try{
                        const response =  fetch("http://localhost:8000/blockproduct", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body:JSON.stringify({id:product.product_id}),
                      })
                          
                      
                     
                        if (response) {
                          swal.fire({
                            title: "Product Deleted successfully",
                            icon: "success"
                          })
                          
                          setButtonText((prevButtonText) => ({
                            ...prevButtonText,
                            [product.product_id]: "Deleted",
                          }));
                          setConfirmationStatus((prevStatus) => ({
                            ...prevStatus,
                            [product.product_id]: true,
                          }));
                          
                        }
                      }
                      catch(err)
                      {
                         console.log(err);
                      }
                    }
                  })
            }}>
           
              {buttonText[product.product_id] || "Delete"}
            </button>
          </td>
        </tr>
      ));

    if (acceptedProducts.length === 0) {
      return (
        <table className={styles.back}>
          <caption>No Accepted Products</caption>
          <tr className={`${styles.cell} ${styles.height}`}>

          <th className={`${styles.cell} ${styles.height}`}>Image</th>
          <th className={`${styles.cell} ${styles.height}`}>Product ID</th>
          <th className={`${styles.cell} ${styles.height}`}>Name</th>
          <th className={`${styles.cell} ${styles.height}`}>Price</th>
          <th className={`${styles.cell} ${styles.height}`}>Quantity</th>
          <th className={`${styles.cell} ${styles.height}`}>Option</th>
        </tr>
          <tr className={styles.cell}>
            <td colSpan="6" style={{ color: 'red' }} className={styles.cell}>
              No Accepted Products
            </td>
          </tr>
        </table>
      );
    }

    return (
      <table className={styles.back}>
        <caption >Accepted Products</caption>
        <tr className={`${styles.cell} ${styles.height}`}>

          <th className={`${styles.cell} ${styles.height}`}>Image</th>
          <th className={`${styles.cell} ${styles.height}`}>Product ID</th>
          <th className={`${styles.cell} ${styles.height}`}>Name</th>
          <th className={`${styles.cell} ${styles.height}`}>Price</th>
          <th className={`${styles.cell} ${styles.height}`}>Quantity</th>
          <th className={`${styles.cell} ${styles.height}`}>Option</th>
        </tr>
        {acceptedProducts}
      </table>
    );
  }

    
