import React, { useState } from 'react'

import styles from "../components/expenseForm.module.css"
import Logo from "../assets/logo.jpg"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function HomePage() {
    let navigate = useNavigate()

    const [data, setData] = useState({})

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        axios.post("http://localhost:8800/", data).then((response) => {
            console.log(response.status);
            if (response.status === 200 && data.user === "admin") {
                navigate(`/admin`)
            } else if (response.status === 200) {
                navigate(`/hotels/${data.user}`)
            }
        });
    };
    return (
        <div className={styles.cont}>
            <div >
                <img className={styles.logo} src={Logo} alt='logo' />
            </div>
            <form onSubmit={handleSubmit}>

                <label>Hotel</label>
                <input id="user"
                    value={data.user || ""}
                    onChange={handleChange} type='text'></input>
                <label>Password</label>
                <input id="password"
                    value={data.password || ""}
                    onChange={handleChange} type='password'></input>

                <button type='submit'>Log In</button>
            </form>
        </div>
    )
}

export default HomePage