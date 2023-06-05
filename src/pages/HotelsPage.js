import React, { useEffect, useState } from 'react'
import ExpenseForm from '../components/ExpenseForm'
import Logo from "../assets/logo.jpg"
import styles from "./hotelsPage.module.css"
import axios from 'axios'

function HotelsPage() {
    const [type, setType] = useState(" ")


    const lastItem = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)

    useEffect(() => {
        axios.get(`http://localhost:8800/${lastItem}`)
            .then(response => setData(response.data.reverse()));
    }, [])

    const [data, setData] = useState([])
    console.log(data)

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8800/${lastItem}/${id}`)
            .then(response => console.log(response));

        window.location.reload(false);
    }
    let totalGel = 0
    let totalUsd = 0
    let totalEur = 0
    data.map((item) => {
        if (item.type === "income" && item.currency === "GEL") {
            return totalGel = totalGel + item.amount
        } else if (item.type === "income" && item.currency === "USD") {
            return totalUsd = totalUsd + item.amount
        } else if (item.type === "income" && item.currency === "EUR") {
            return totalEur = totalEur + item.amount
        }
        if (item.type === "expense" && item.currency === "GEL") {
            return totalGel = totalGel - item.amount
        } else if (item.type === "expense" && item.currency === "USD") {
            return totalUsd = totalUsd - item.amount
        } else if (item.type === "expense" && item.currency === "EUR") {
            return totalEur = totalEur - item.amount
        }
    })

    console.log(lastItem)

    return (
        <>
            <header>

                <div >
                    <p>Total :<span> {totalGel}</span> Gel</p>
                    <p>Total : <span> {totalUsd}</span> USD</p>
                    <p>Total : <span> {totalEur}</span> EUR</p>
                </div>
                <div >
                    <img className={styles.logo} src={Logo} alt='logo' />
                    <h1>{lastItem}</h1>
                </div>
                <div >
                    <p>curency </p>
                    <p>curency </p>
                    <p>curency </p>
                </div>
            </header>
            <main>
                {type === " " && <><button onClick={() => { setType("income") }}>Add Income</button>
                    <button className={styles.btn} onClick={() => { setType("expense") }}>Add Expense</button></>}
                {type !== " " && <ExpenseForm type={type} hotel={lastItem}></ExpenseForm>}
            </main>
            <div className={styles.tableCont}>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>User</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Comment</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((item, index) => {
                            return <tr className={styles.row} key={index}>
                                {item.type === "expense" ? <td style={{ color: 'red' }}>{item.type}</td> : <td style={{ color: 'green' }} >{item.type}</td>}
                                <td>{item.user}</td>
                                <td>{item.amount}</td>
                                <td>{item.currency}</td>
                                <td>{item.comment}</td>
                                <td>{item.date}</td>
                                <button className={styles.deleteBtn} onClick={() => { deleteHandler(item.id) }}>delete</button>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default HotelsPage