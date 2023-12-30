import React, { useState,useEffect } from 'react';
import { createContext } from 'react';
import styles from './style.module.css';
import { Link } from "react-router-dom";
import Admin from '../Admin';
import { useNavigate } from 'react-router-dom';

function Login() {
  
  
  let invalid=0;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isloggedin,setloggedin]=useState(false);
  const [token,setToken]=useState('');
  const store=JSON.stringify(localStorage.getItem(token));
  const navigate=useNavigate();
  const ptrn = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      let t=token.split(":");
      if(t[1]=="admin")
      {
        navigate('/admin');
      }
      else if(t[1]=="user")
      {
        navigate('/products');
      }
      else if(t[1]=="state")
      {
        navigate('/state');
      }
      else if(t[1]=="city")
      {
        navigate('/city');
      }
      else if(t[1]=="seller")
      {
        navigate('/seller');
      }
      else{
        navigate('/login');
      }
       
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === '' && name.trim() === '' && password.trim() === '') {
      alert('Please enter data.');
    } else if (!email.trim().match(ptrn)) {
      alert('Please enter a valid email.');
    } else {
      
      console.log('Form submitted:', name, email, password);
      const data={name:name,email:email,password:password};
     
       
       getdata(data);
    }
  };
  
  function getdata(data)
  {
    console.log("inside");
    console.log(data);
      const fun= async()=>{
        console.log(data,typeof(data));
        const response=await fetch("http://localhost:8000/login",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data),
      })
      
      .then(function(response)
      {
        
        let data= response.json();
        return data;
      })
      .then(function(data){
        setloggedin(true);
        
        if(data.status==402)
        {
          localStorage.setItem("token", data.token+":"+"admin");
          navigate("/admin");
        }
        else if(data.status==403)
        {
          localStorage.setItem("token", data.token+":"+"user");
          navigate("/products");
        }
        else if(data.status==404){
          localStorage.setItem("token", data.token+":"+"seller");
          navigate("/seller");
        }
        else if(data.status==405)
        {
          localStorage.setItem("token", data.token+":"+"state");
          navigate("/state");
        }
        else if(data.status==406)
        {
          localStorage.setItem("token", data.token+":"+"city");
          navigate("/city");
        }
        else if(response.status==407){
          invalid++;
          console.log(invalid);
        }
      }) 
        
      
    }
     fun(); 
  
  }
  
  return (
    (store && isloggedin||invalid!=0?
    <div id={styles.login}>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter username:</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          className={styles.back}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <label className={styles.email_i}>Enter Email:</label>
        <input
          type="email"
          placeholder="abc@gmail.com"
          name="email"
          
          value={email}
          className={styles.back}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <label>Enter Password:</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          className={styles.back}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <input type="submit" value="Submit" id={styles.data_submit} />
      </form>
      <p className={styles.para}>Enter valid data</p>
      <Link to="/signup" id={styles.btn}>Signup</Link><br />
      <Link to="/forgot">Forgot password?</Link> 
    </div> :<div id={styles.login}>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter username:</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          className={styles.back}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <label className={styles.email_i}>Enter Email:</label>
        <input
          type="email"
          placeholder="abc@gmail.com"
          name="email"
          
          value={email}
          className={styles.back}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <label>Enter Password:</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          className={styles.back}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <input type="submit" value="Submit" id={styles.data_submit} />
      </form>
      
      <Link to="/signup" id={styles.btn}>Signup</Link><br />
      <Link to="/forgot">Forgot password?</Link> 
    </div>)
  );
}

export default Login;