const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const port = 4443;

const app = express();

app.use(express.static('public'));

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

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
    passphrase:'P@ssw0rd'
  }, app).listen(port, () => {
    console.log('Listening...')
  })
