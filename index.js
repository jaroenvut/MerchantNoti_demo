//Require function from npm.com
const { request } = require('express')
const express = require('express')
const app = express()
const fs = require("fs")
const crypto = require("crypto")

//Create timestamp in epoch format
const timestamp = Math.floor(new Date().getTime() / 1000);

// Used same private key of create order
const private_key = fs.readFileSync('private.pem', 'utf-8');
const port = process.env.PORT || 3000

app.use(express.json())
app.post('/', (req, res) => {
    const notifyId = req.body.notify_id
    const body = {"status":{"code":"11111","message":"success","description":"Product has been checked out"},"data":{"notify_id":(notifyId)}}
    const body_stringify = (JSON.stringify(body))
    const data_signature = (timestamp)+(body_stringify);
    //Signing with RSA-SHA256
    const signer = crypto.createSign('RSA-SHA256');
    signer.write(data_signature);
    signer.end();

    //Returns the signature in output_format which 'base64'
    const signature = signer.sign(private_key, 'base64')
    console.log(signature)
    //End sign signature

    res.header({
    'Content-type' : 'application/json',
    'timestamp' : (timestamp),
    'content-signature' : (`digest-alg=RSA-SHA; key-id=KEY:RSA:rsf.org; data=${signature}`)
      })
    //response status 200=success, 400=auto refund, 404= auto refund
    res.status(200).send(body_stringify)
})

  app.listen(port, () => {
    console.log('Server is running on '+`https://localhost:${port}`)
  })
