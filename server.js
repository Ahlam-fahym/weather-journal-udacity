const cors = require ('cors')
const express = require ('express')
const bodyParser = require ('body-parser');
const { response, request } = require('express');


const port = 4800;

// Setup empty JS object to act as endpoint for all routes
  projectData = {};

// Require Express to run server and routes

// Start up an instance of app
const app = express()


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port,() =>{
    console.log(`Server Running On:http://localhost:${port}/`)
})
// require express to run server and routes
// get all data by localhost
app.get('/getAll',(req ,res) => {
res.send(projectData).status(200).end();

})
// post all data 
app.post('/postData',(req ,res) => {

    projectData = req.body
    res.send(projectData).status(200).end();
 
})