const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const path = require('path');
const fs = require('fs');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const port = 8001; 
/*---------------------------------------*/
/*START SERVER*/
/*---------------------------------------*/
const server = express();
server.listen(port, ()=>{console.log(`Server available at http://localhost:${port}`)});
server.use(express.json());
server.set('trust proxy', true);

/*---------------------------------------*/
/*HIDE THE X-POWERED-BY TO AVOID ATTACKERS TO KNOW WHAT TECH POWERS OUR SERVER*/
/*---------------------------------------*/
server.disable('x-powered-by');

/*---------------------------------------*/
/*SET CORS*/
/*---------------------------------------*/
server.use(cors());
/*list of allowed domains*/
var allowedOrigins = [
  'file://',
  `chrome-extension://aejoelaoggembcahagimdiliamlcdmfm`,
  `http://localhost:${port}`,
  `http://localhost:8080`,
  `http://localhost`,
];

server.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.'
      return callback(msg, false)
    }
    return callback(null, true)
  }
}));

/*---------------------------------------*/
/*USE BODY PARSER FOR READING DATA SENT VIA AJAX FROM --CLIENTS*/
/*---------------------------------------*/
/*set the body parser this will enable the app to read form-url-encoded data as objects*/
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

/*handle body parser invalid JSON format*/
server.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    // Bad request
    return res.status(400).send({ message: 'Invalid JSON format!' });
  }
  return next();
});


/*---------------------------------------*/
/* Test begins here */
/*---------------------------------------*/

/* generates a key */
let secret = '';
server.get('/get-key', (req, res, next)=>{
    const key = speakeasy.generateSecret();
    secret = key.base32;
    res.send({secret, key});
});

/* Generates the qr code in image file or base 64 format */
server.get('/generate-qr', (req, res) => {
    const username = req.query.username || 'johndoe@example.com';
    const issuer = req.query.issuer || 'PSSLAI';
    const asFile = req.query.asFile;
    const otppauth = `otpauth://totp/${issuer}:${username}?secret=${secret}&issuer=${issuer}`;
    QRCode.toDataURL(otppauth, function (err, data) {
        // path
        const qrPath = path.join(__dirname, `/qrfile.png`);
        
        if (asFile === 'true') {
          // Remove header
          let base64Image = data.split(';base64,').pop();
          
          fs.writeFileSync(qrPath, base64Image, {encoding: 'base64'});
          return res.status(200).download(qrPath, 'qrcode.png', (err) => {
            if(err){
              console.error(err)
            }else{
              try {
                //file removed
                fs.unlinkSync(qrPath);
              } catch(err) {
                console.error(err)
              }
            }
          });
        }

        return res.send({data});
    });
});

/* Verifies the otp code entered */
server.post('/verify', (req, res) => {
  var verified = speakeasy.totp.verify({ 
    secret: secret,
    encoding: 'base32',
    token: req.body.code 
  });
  if (verified) {
    return res.send({message: 'Verified'});
  }
  return res.send({message: 'Incorrect code!'});
});


// Catch all requests that does not have existing route. 
server.all('*', (req, res) => {
    res.status(404).send({ message: 'Request not found!' });
  });
  
  module.exports = server;
