const { request } = require('express')
const express = require('express')
const app = express()
const fs = require("fs")
const port = process.env.PORT || 3000

app.use(express.json())
app.post('/', (req, res) => {
    const notifyId = req.body.notify_id
    res.json({"status":{"code":"00000","message":"success","description":"Product has been checked out"},"data":{"notify_id":(notifyId)}})
})

app.get('/', (req, res) => {
    res.json("Demo merchant noti on heroku free hosting")
  })

  app.listen(port, () => {
    console.log('Server is running on '+`https://localhost:${port}`)
  })