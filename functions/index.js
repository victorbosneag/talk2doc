<<<<<<< HEAD
//const functions = require("firebase-functions");
=======
const functions = require("firebase-functions");
>>>>>>> dee5a2f7c1a83ffe1cea070defc2a8c090485e1e
const express = require("express");
const cors = require("cors"); //security;

// - App config
const app = express(); //set up express server 

// - Middlewares
app.use(cors({ origin: true })); //allow cross-origin requests 
app.use(express.json()); //turn request data to json format

// - API roots 
app.get('/', (req, res) => res.status(200).send('hello world'));
<<<<<<< HEAD
app.post('/tester/create', async (req, res) => {
    const info = req.query.info;
=======
app.post('/tester/create', (req, res) => {
    const info = req.data;
>>>>>>> dee5a2f7c1a83ffe1cea070defc2a8c090485e1e
    res.status(201).send(info);
});

// - listen command (cloud function)
<<<<<<< HEAD
//exports.api = functions.https.onRequest(app);
=======
exports.api = functions.https.onRequest(app);
>>>>>>> dee5a2f7c1a83ffe1cea070defc2a8c090485e1e
