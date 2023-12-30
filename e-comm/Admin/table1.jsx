import { useState } from 'react';
import styles from './style.module.css';
import swal from 'sweetalert2';

export default function Table1(props) {
  const [confirmationStatus, setConfirmationStatus] = useState({});
  
  
  const handleAccept = async (productId, index) => {
    try {
      const response = await fetch("http://localhost:8000/acceptproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId }),
      });
  
      if (response.ok) {
        swal.fire({
          title: "Product Accepted successfully",
          icon: "success",
        });
  
        const acceptedProduct = props.data.find((product) => product.product_id === productId);

        if (acceptedProduct) {
          props.onProductAccepted(
            props.data.filter((product) => product.product_id !== productId),
            acceptedProduct
          );
        setConfirmationStatus((prevStatus) => ({
          ...prevStatus,
          [productId]: true,
        }));
      }
    }
    } catch (err) {
      console.log(err);
    }
  };
  
  
  const handleReject = async (productId, index) => {
    try {
      const response = await fetch("http://localhost:8000/rejectproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId }),
      });

      if (response.ok) {
        swal.fire({
          title: "Product Rejected successfully",
          icon: "success",
        });

        
        const updatedData = props.data.filter((product) => product.product_id !== productId);
        props.onProductRejected(updatedData);

        setConfirmationStatus((prevStatus) => ({
          ...prevStatus,
          [productId]: true,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const acceptedProducts = props.data
    .filter((product) => product.flag === 'R')
    .map((product, index) => (
      <tr key={product.product_id} className={styles.cell}>
        <td style={{ width: '10%', height: '10%' }} className={styles.cell}>
          <img src={`http://localhost:8000/profile/${product.image}`} alt={product.productname} className={styles.img} />
        </td>
        <td className={styles.cell}>{product.product_id}</td>
        <td className={styles.cell}>{product.productname}</td>
        <td className={styles.cell}>{product.price}</td>
        <td className={styles.cell}>{product.quantity}</td>
        <td style={{ width: '30%' }} className={styles.cell}>
          <button
            disabled={confirmationStatus[product.product_id]}
            className={styles.bttn}
            onClick={() => handleAccept(product.product_id, index)}
          >
            Accept
          </button>
        
        
          <button
            disabled={confirmationStatus[product.product_id]}
            className={
              confirmationStatus[product.product_id] ? styles.dis : styles.danger
            }
            onClick={() => handleReject(product.product_id, index)}
          >
            Reject
          </button>
        </td>
      </tr>
    ));

  if (acceptedProducts.length === 0) {
    return (
      <table className={styles.back}>
        <caption>No Requested Products</caption>
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
            No Requested Products
          </td>
        </tr>
      </table>
    );
  }

  return (
    <table className={styles.back}>
      <caption>Requested Products</caption>
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
