//const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors"); //security;

// - App config
const app = express(); //set up express server 

// - Middlewares
app.use(cors({ origin: true })); //allow cross-origin requests 
app.use(express.json()); //turn request data to json format

// - API roots 
app.get('/', (req, res) => res.status(200).send('hello world'));
app.post('/tester/create', async (req, res) => {
    const info = req.query.info;
    res.status(201).send(info);
});

// - listen command (cloud function)
//exports.api = functions.https.onRequest(app);