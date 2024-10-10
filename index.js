const express = require('express')
const axios = require('axios');
const app = express()
const port = 3000

// respond with "hello world" when a GET request is made to the homepage
app.get('/', async (req, res) => {
    try {
        const response = await axios.get("https://rickandmortyapi.com/api/character")
        const characters = response.data.results;
        console.log(characters)
        res.json(characters)
    } catch(error) {
        console.log(`There was an Error ${error}`)
        throw new Error(error)
    }
})

app.listen(port, () => {
    console.log(`Rick and Morty app listening on port ${port}`)
}) 
