// Setup empty JS object to act as endpoint for all routes

projectData = {};

// Require Express to run server and routes

const express = require('express');

// Require body-parser

const bodyParser = require('body-parser');

// Require cors

const cors = require('cors');

// Start up an instance of app

const app = express();

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Cors for cross origin allowance

app.use(cors());

// Initialize the main project folder

app.use(express.static('website'));

// Setup Server

const port = 8000;

const server = app.listen(port, ()=>{

    console.log(`Server is running on localhost: ${port}`)});

// creating get function

app.get('/allData',sendData);

function sendData(req, res){

    res.send(projectData);

};

//creating post function

app.post('/addData',addData);

function addData(req,res){

    let data = req.body;

    console.log('server brodcasting data', data);

    projectData['date'] = data.date;

    projectData['temp'] = data.temp;

    projectData['feel'] = data.feel;

    res.send(projectData);

};