import React, { useState } from 'react'
import styles from "./expenseForm.module.css"
import axios from 'axios';

function ExpenseForm(props) {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;

    const [data, setData] = useState({ type: props.type, currency: "GEL", date: currentDate })

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        axios.post(`http://localhost:8800/${props.hotel}`, data).then((response) => {
            console.log(response.status);
        });
        window.location.reload(false);
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>{props.type}</h2>
            <label>User</label>
            <input id="user"
                value={data.user || ""}
                onChange={handleChange} type='text'></input>
            <label>Amount</label>
            <div className={styles.amount}>
                <input id="amount"
                    value={data.amount || ""}
                    onChange={handleChange} type='number'></input>
                <select id="currency"
                    value={data.currency || ""}
                    onChange={handleChange}>
                    <option value="GEL">GEL</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
            <label>comment</label>
            <input id="comment"
                value={data.comment || ""}
                onChange={handleChange} type='text'></input>
            <button type='submit'>Save</button>
        </form>
    )
}

export default ExpenseForm