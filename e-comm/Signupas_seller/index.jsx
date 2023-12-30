import { useState } from 'react';
import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
export default function Signupas_seller()
{
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [aadhar,setAadhar]=useState('');
    const navigate =useNavigate();
    
    function GetSignup()
    {
       navigate("/signup");
    }
    async function check(e)
    {
        e.preventDefault();
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const aadharRegex=/^[0-9]{12}$/;
        if(name.trim()==''&& email.trim()==''&& aadhar.trim()=='' && password.trim()=='')
        {
            swal.fire(
            {
                title:"Fill out all the fields",
                icon:"warning"
            })
        }
        else if(!email.trim().match(emailRegex))
        {
            swal.fire(
                {
                    title:"Enter valid Email",
                    icon:"warning"
                })
        }
        else if(!aadhar.trim().match(aadharRegex))
        {
            swal.fire(
                {
                    title:"Enter valid Aadhar Number",
                    icon:"warning"
                })
        }
        else{
            let data={name:name.trim(),email:email.trim(),aadhar:aadhar.trim(),password:password.trim()};
            try{
                const response = await fetch("http://localhost:8000/seller_data", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body:JSON.stringify(data),
              })
               
                if (response.status==204) {
                    swal.fire({
                        title:"Your Information submitted successfully",
                        icon:"success",
                        text:"After verification you get an email"
                      })
                      setName('');
                      setEmail('');
                      setAadhar('');
                      setPassword('');
                }
                else if(response.status==202)
                {
                    swal.fire({
                        title:"You Can't become a seller",
                        icon:"warning"
                        
                      })
                      setName('');
                      setEmail('');
                      setAadhar('');
                      setPassword('');
                }
                else if(response.status==203)
                {
                    swal.fire({
                        title:"Your Account already exist",
                        icon:"warning" 
                      })
                      setName('');
                      setEmail('');
                      setAadhar('');
                      setPassword('');
                }
               
              }
              catch(err)
              {
                 console.log(err);
              }
        }
    }
    return (
        <>
        
        <input type="button" value="Back" className={`${styles.body}`} onClick={GetSignup} />
    <div className={styles.container}>
        <h1>Submit Your Information</h1>
        
            <div className={styles.form_group}>
                <label className={styles.label}>Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} required/>
            </div>
            <div className={styles.form_group}>
                <label className={styles.label}>Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} required/>
            </div>
            <div className={styles.form_group}>
                <label className={styles.label}>Aadhar Number:</label>
                <input type="text" id="aadhar" name="aadhar" value={aadhar} onChange={(e) => setAadhar(e.target.value)}className={styles.input} required/>
            </div>
            <div className={styles.form_group}>
                <label className={styles.label}>Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input}  required/>
            </div>
            
            <div className={styles.form_group}>
                <button type="button" id="submitBtn" className={styles.button} onClick={check}>Submit</button>
            </div>
        {/* </form> */}
    </div>
    </>
    )
}