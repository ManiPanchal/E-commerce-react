import styles from './style.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
export default function UserForm()
{
    const navigate=useNavigate();
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        pincode: '',
        address: '',
        city: 'Yamuna Nagar', 
        state: 'Haryana',
        phone: '',
      });
      useEffect(() => {
        const fetchData = async () => {
          
          let t = localStorage.getItem("token");
          if (t) {
            t = t.split(":");
            try {
              const response = await fetch('http://localhost:8000/getuserinfo', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token": `${t[0]}`,
                },
                
              });
              const d = await response.json();
              // console.log(d);
              setData(d);
              if (d.length > 0) {
                setFormData({
                  name: d[0].name,
                  pincode: d[0].pincode,
                  address: d[0].street_add,
                  city: d[0].city,
                  state: 'Haryana',
                  phone: d[0].phone,
                });
              }
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          } else {
            navigate("/login");
            
          }
        };
      
        fetchData();
      }, []);
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.name.trim()===""&&formData.pincode.trim()===""&&formData.address.trim()===""&&formData.city.trim()===""&&formData.state.trim()===""&&formData.phone.trim()===""&&formData.address.trim()==="")
        {
            
            swal.fire({
                title: 'Please Fill out all the details',
                icon: 'warning',
              });
        }
        else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
            
            swal.fire({
                title: 'Please Enter a valid Phone number',
                icon: 'warning',
              });
        e.preventDefault();
    }
        else if(!/^[0-9]{6}$/.test(formData.pincode.trim()))
        {
            
            swal.fire({
                title: 'Please Enter a valid Pincode',
                icon: 'warning',
              });
            e.preventDefault();
        }
        else{
        
        let t = localStorage.getItem("token");
        try {
          
          t=t.split(":");
          const response = await fetch(data.length === 0 ? 'http://localhost:8000/saveuser' : 'http://localhost:8000/updateuserinfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "x-access-token": `${t[0]}`,
            },
            body: JSON.stringify(formData),
          });
    
          if (response.status==401) {
            
            window.location.href = '/placeorder';
          } else {
            swal.fire({
                title: 'Something went wrong',
                icon: 'warning',
              });
            
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
    }
      };
    
    return (
        <>
        <div className={styles.container}>
        <h2>Fill Your Details</h2>
        <form id="registrationForm" onSubmit={handleSubmit}>
            <div className={styles.form_group}>
                <label htmlFor="name" className={styles.label}>Name:</label>
                <input type="text" id="name" name="name" value={formData.name} required className={styles.input} onChange={handleChange}/>
            </div>
            <div className={styles.form_group}>
                <label htmlFor="pincode" className={styles.label}>Pincode:</label>
                <input type="number" id="pincode" name="pincode" pattern="[0-9]{6}" value={formData.pincode} required className={styles.input} onChange={handleChange}/>
            </div>
            <div className={styles.form_group}>
                <label htmlFor="address" className={styles.label}>Address:</label>
                <input type="text" id="address" name="address" value={formData.address} required className={styles.input} onChange={handleChange}/>
            </div>
            <div className={styles.form_group}>
                <label htmlFor="city" className={styles.label}>City:</label>
                
                <select id="city" value={formData.city} className={styles.input} onChange={handleChange}>
                    <option value="yamuna nagar">Yamuna Nagar</option>
                    <option value="Ambala">Ambala</option>
                    <option value="Karnal">Karnal</option>
                    <option value="Rohtak">Rohtak</option>
                </select>
            </div>
            <div className={styles.form_group}>
                <label htmlFor="state" className={styles.label}>State:</label>
                <input type="text" id="state" name="state" value="Haryana" readOnly className={styles.input} />
            </div>
            <div className={styles.form_group}>
                <label htmlFor="phone" className={styles.label}>Phone Number:</label>
                <input type="number" id="phone" name="phone" pattern="[0-9]{10}" value={formData.phone} required className={styles.input} onChange={handleChange}/>
            </div>
           
            <input type="submit" className={styles.submit} value="Next" />
        </form>
    </div>
        </>
    )
}