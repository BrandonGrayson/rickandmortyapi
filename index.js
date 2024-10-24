// const express = require('express')
// const axios = require('axios');
import express from "express"
import axios from "axios"
import { pool } from "./db.js"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { readFile } from 'node:fs/promises'
import { resolvers } from "./resolvers.js"
import cors from 'cors'

// import cors from cors

const app = express()
const PORT = 9000

const typeDefs = await readFile('./schema.graphql', 'utf8')
app.use(cors(), express.json());

const apolloServer = new ApolloServer({typeDefs, resolvers})
await apolloServer.start()

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

app.use("/characters", expressMiddleware(apolloServer), async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM characters'); // Replace with your table name
        res.json(result.rows);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})

app.listen({ port: PORT }, () => {
    console.log(`Rick and Morty app listening on port ${PORT}`)
}) 
