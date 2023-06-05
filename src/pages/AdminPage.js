import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from "./hotelsPage.module.css"


function AdminPage() {
    const [Tekladata, setTeklaData] = useState([])
    const [Urbandata, setUrbanData] = useState([])

    useEffect(() => {
        //urban
        axios.get(`http://localhost:8800/urban`)
            .then(response => setUrbanData(response.data));
        //tekla
        axios.get(`http://localhost:8800/teklaPalace`)
            .then(response => setTeklaData(response.data));
    }, [])
    console.log(Tekladata)
    console.log(Urbandata)

    let totalGelTekla = 0
    let totalUsdTekla = 0
    let totalEurTekla = 0
    Tekladata.map((item) => {
        if (item.type === "income" && item.currency === "GEL") {
            return totalGelTekla = totalGelTekla + item.amount
        } else if (item.type === "income" && item.currency === "USD") {
            return totalUsdTekla = totalUsdTekla + item.amount
        } else if (item.type === "income" && item.currency === "EUR") {
            return totalEurTekla = totalEurTekla + item.amount
        }
        if (item.type === "expense" && item.currency === "GEL") {
            return totalGelTekla = totalGelTekla - item.amount
        } else if (item.type === "expense" && item.currency === "USD") {
            return totalUsdTekla = totalUsdTekla - item.amount
        } else if (item.type === "expense" && item.currency === "EUR") {
            return totalEurTekla = totalEurTekla - item.amount
        }
    })

    let totalGelUrban = 0
    let totalUsdUrban = 0
    let totalEurUrban = 0
    Urbandata.map((item) => {
        if (item.type === "income" && item.currency === "GEL") {
            return totalGelUrban = totalGelUrban + item.amount
        } else if (item.type === "income" && item.currency === "USD") {
            return totalUsdUrban = totalUsdUrban + item.amount
        } else if (item.type === "income" && item.currency === "EUR") {
            return totalEurUrban = totalEurUrban + item.amount
        }
        if (item.type === "expense" && item.currency === "GEL") {
            return totalGelUrban = totalGelUrban - item.amount
        } else if (item.type === "expense" && item.currency === "USD") {
            return totalUsdUrban = totalUsdUrban - item.amount
        } else if (item.type === "expense" && item.currency === "EUR") {
            return totalEurUrban = totalEurUrban - item.amount
        }
    })

    return (
        <div className={styles.admin}>
            <div className={styles.parent}>
                <h3>Tekla Palace</h3>
                <p>amount Gel {totalGelTekla}</p>
                <p>amount Usd {totalUsdTekla}</p>
                <p>amount Euro {totalEurTekla}</p>
            </div>
            <div className={styles.parent}>
                <h3>Urban</h3>
                <p>amount Gel {totalGelUrban}</p>
                <p>amount Usd {totalUsdUrban}</p>
                <p>amount Euro {totalEurUrban}</p>
            </div>
        </div>
    )
}

export default AdminPage