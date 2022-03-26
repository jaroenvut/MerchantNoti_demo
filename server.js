const { request } = require('express')
const express = require('express')
const app = express()
const fs = require("fs")

app.use(express.json())
app.post('/', (req, res) => {
    const notifyId = req.body.notify_id
    res.json({"status":{"code":"00000","message":"success","description":"Product has been checked out"},"data":{"notify_id":(notifyId)}})
})

const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log('Server is running on '+`https://localhost:${port}`)
  })