const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;

const app = express();

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Hello browser");
});

app.post('/login', (req,res) =>{
    console.log(JSON.stringify(req.body));
    if(req.body.userName =="seanmurdock" && req.body.password=="6f1ed002ab5595859014ebf0951522d9"){
        res.send("Welcome!")
    } else{
        res.send("Who are you?");
    }
});

app.listen(port, ()=>{});