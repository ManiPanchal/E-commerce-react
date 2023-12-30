import styles from './style.module.css';
import swal from 'sweetalert2';
export default function Table(props)
{
  const rejectseller = async (email) => {
    
    const response = await fetch('http://localhost:8000/reject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({ email: email }),
    });

    if (response.status==202) {
      
      // const rejected = props.data.find((seller) => seller.s_email === email);

      //   if (rejected) {
      //     props.onSellerRejected(
      //       props.data.filter((seller) => seller.s_email !== email),
      //       rejected
      //     );
      props.onSellerRejected(email);
      swal.fire({
        title: 'seller rejected successfully',
        icon: 'success',
      });
    }
  };
  const acceptSeller = async (email) => {
    const response = await fetch('http://localhost:8000/update_role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    });
    if(response.status==202)
    {
    swal.fire({
      title: 'Seller accepted successfully',
      icon: 'success',
    });
    props.onSellerAccepted(email);
  }
  };

    const acceptedSellers = props.data
      .filter((seller) => seller.is_verified === 'Verified')
      .map((seller) => (
        <tr  key={seller.s_email} className={styles.cell}>
           <td className={`${styles.cell} ${styles.height}`}>{seller.s_name}</td>
          <td className={`${styles.cell} ${styles.height}`}>{seller.s_email}</td>
           <td className={`${styles.cell} ${styles.height}`}>{seller.s_aadhar}</td>
           
         </tr>
     ));
     const requestedSellers=props.data
     .filter((seller)=>seller.is_verified==='NotVerified')
     .map((seller)=>(
      <tr  key={seller.s_email} className={styles.cell}>
      <td className={`${styles.cell} ${styles.height}`}>{seller.s_name}</td>
     <td className={`${styles.cell} ${styles.height}`}>{seller.s_email}</td>
      <td className={`${styles.cell} ${styles.height}`}>{seller.s_aadhar}</td>
      <td className={`${styles.cell} ${styles.height}`}><button className={styles.bttn} onClick={() => acceptSeller(seller.s_email)}>Accept</button><button className={styles.danger} onClick={()=>rejectseller(seller.s_email)}>Reject</button></td>
    </tr>
     ));
    if (acceptedSellers.length === 0) 
    {
      return (
        <>
      <table className={styles.back}>
        <caption >Sellers Request</caption>
        <tr className={`${styles.cell} ${styles.height}`}>

          
          <th className={`${styles.cell} ${styles.height}`}>Name</th>
          <th className={`${styles.cell} ${styles.height}`}>E-mail</th>
          <th className={`${styles.cell} ${styles.height}`}>Aadhar No</th>
          <th className={`${styles.cell} ${styles.height}`}>Option</th>
        </tr>
        
        {requestedSellers}
      </table>
      <table className={styles.back}>
      <caption >Sellers</caption>
      <tr className={`${styles.cell} ${styles.height}`}>

        
        <th className={`${styles.cell} ${styles.height}`}>Name</th>
        <th className={`${styles.cell} ${styles.height}`}>E-mail</th>
        <th className={`${styles.cell} ${styles.height}`}>Aadhar No</th>
        {/* <th className={`${styles.cell} ${styles.height}`}>Option</th> */}
      </tr>
      <tr>
      <td colSpan="3" className={`${styles.cell} ${styles.height} ${styles.red}`}>No sellers</td></tr>

      {acceptedSellers}
    </table>
    </>
    );
    }
     if(requestedSellers.length==0)
     {
      return (
        <>
      <table className={styles.back}>
        <caption >Sellers Request</caption>
        <tr className={`${styles.cell} ${styles.height}`}>

          
          <th className={`${styles.cell} ${styles.height}`}>Name</th>
          <th className={`${styles.cell} ${styles.height}`}>E-mail</th>
          <th className={`${styles.cell} ${styles.height}`}>Aadhar No</th>
          <th className={`${styles.cell} ${styles.height}`}>Option</th>
        </tr>
        <tr >
          <td colSpan="4" className={`${styles.cell} ${styles.height} ${styles.red}`}>No seller Requests</td></tr>
        
        {requestedSellers}
      </table>
      <table className={styles.back}>
      <caption >Sellers</caption>
      <tr className={`${styles.cell} ${styles.height}`}>

        
        <th className={`${styles.cell} ${styles.height}`}>Name</th>
        <th className={`${styles.cell} ${styles.height}`}>E-mail</th>
        <th className={`${styles.cell} ${styles.height}`}>Aadhar No</th>
        {/* <th className={`${styles.cell} ${styles.height}`}>Option</th> */}
      </tr>
      {acceptedSellers}
    </table>
    </>
    );

     }
    return (
        <>
      <table className={styles.back}>
        <caption >Sellers Request</caption>
        <tr className={`${styles.cell} ${styles.height}`}>

          
          <th className={`${styles.cell} ${styles.height}`}>Name</th>
          <th className={`${styles.cell} ${styles.height}`}>E-mail</th>
          <th className={`${styles.cell} ${styles.height}`}>Aadhar No</th>
          <th className={`${styles.cell} ${styles.height}`}>Option</th>
        </tr>
        
        {requestedSellers}
      </table>
      <table className={styles.back}>
      <caption >Sellers</caption>
      <tr className={`${styles.cell} ${styles.height}`}>

        
        <th className={`${styles.cell} ${styles.height}`}>Name</th>
        <th className={`${styles.cell} ${styles.height}`}>E-mail</th>
        <th className={`${styles.cell} ${styles.height}`}>Aadhar No</th>
        {/* <th className={`${styles.cell} ${styles.height}`}>Option</th> */}
      </tr>
      {acceptedSellers}
    </table>
    </>
    );
  }
