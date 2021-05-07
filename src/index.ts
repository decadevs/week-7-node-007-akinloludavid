import express from 'express';

const app = express()
const database = require('./database/database.json')

app.post('/calculate', (req, res)=>{
  

})
app.get('/fetchUsers', (req, res)=>{
  res.status(200).send(database)
} )

