// const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.json('hi')
})

app.get('/convert', (req, res) => {
    const toCurrency = req.query.to_currency
    const fromCurrency = req.query.from_currency
    // console.log(toCurrency, fromCurrency)


    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: { from_currency: fromCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: toCurrency },
        headers: {
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            'x-rapidapi-key': 'f10962b933msh967b88ae830ffbfp1c3634jsn29aae1a8d962'
        }
    }

    axios.request(options).then((response) => {
        res.json(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
    }).catch((error) => {
        console.error(error)
    })
})

app.get('/news', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://crypto-news-live.p.rapidapi.com/news',
        headers: {
            'x-rapidapi-host': 'crypto-news-live.p.rapidapi.com',
            'x-rapidapi-key': 'f10962b933msh967b88ae830ffbfp1c3634jsn29aae1a8d962'
        }
    }

    axios.request(options).then((response) => {
        res.json(response.data.slice(0, 5))
        // console.log(response.data)

    }).catch((error) => {
        console.error(error)
    })
})


app.listen(process.env.PORT || 5000, () => console.log(`Server is running `))