import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import CreateItem from './create'; 
import styles from './style.module.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';

export default function Product() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [x, setX] = useState(0);
  const [user, setUser] = useState('');

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/addproducts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ x: x }),
        });

        if (response.ok) {
          const products = await response.json();
          let y = x + products.length;
          setX(y);
          setData(products);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const t = token.split(":");
        const response = await fetch("http://localhost:8000/finduser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${t[0]}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData[0].name);
        }
      } else {
        setUser("User");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const load = async () => {
    try {
      const response = await fetch("http://localhost:8000/addproducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ x: x }),
      });

      if (response.ok) {
        const data2 = await response.json();
        let z = x + data2.length;
        setX(z);
        setData((prevData) => [...prevData, ...data2]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const find = async (e) => {
    try {
      if (e.target.value.trim() === "") {
        setX(5);
        const response = await fetch("http://localhost:8000/addproducts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ x: 0 }),
        });

        if (response.ok) {
          const data2 = await response.json();
          if (data2.length > 0) {
            setData(data2);
          }
        }
      } else {
        const response = await fetch("http://localhost:8000/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: e.target.value.trim() }),
        });

        if (response.ok) {
          const data2 = await response.json();
          if (data2.length > 0) {
            setData(data2);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div id={styles.body}>
        <span id={styles.user}>Welcome {user}</span>
        <div className={styles.dropdown}>
          <button onClick={handleOpen} className={styles.dropbtn}>
            <AiOutlineMenu />
          </button>
          {open ? (
            <div className={styles.dropdown_content}>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
              <li>
                <Link to="/changepassword">Change Password</Link>
              </li>
              <li>
                <Link to="/view_cart">View Cart</Link>
              </li>
              <li>
                <Link to="/myorders">My Orders</Link>
              </li>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <h1 className={styles.margin}>E-MART</h1>
        <input type="search" id={styles.search} placeholder="Search..." onChange={find} />
      </div>

      <div id={styles.products}>
        <CreateItem data={data} />
      </div>
      <input type="button" value="Load More" onClick={load}></input>
    </>
  );
}

