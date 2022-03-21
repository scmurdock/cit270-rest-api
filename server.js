const https = require('https');
const fs = require('fs');
const md5 = require('md5');
const express = require('express');
const bodyParser = require('body-parser');
const port = 443;
const app = express();

let invalidLoginAttempts=0;

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Hello browser");
});

app.post('/login', (req,res) =>{
    console.log(JSON.stringify(req.body));
    if(invalidLoginAttempts>=5){
        res.status(401);//unauthorized        
        res.send("Max attempts reach");
    }
    else if(req.body.userName =="seanmurdock" && md5(req.body.password)=="161ebd7d45089b3446ee4e0d86dbcf92"){//  P@ssw0rd
        res.send("Welcome!")
    }  else{
        invalidLoginAttempts++;
        console.log(invalidLoginAttempts+" invalid attempts");
        res.status(401);//unauthorized
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
