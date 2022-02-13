const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./controller/authcontroller');
const testroute = require('./controller/testroute');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const { requireAuth,checkUser } = require('./middleware/authmiddleware');
require('dotenv').config()

const app = express();

app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.get('/',requireAuth,(req,res)=>{
  res.sendStatus(200)
})

app.get('/unauth',(req,res)=>{
  res.sendStatus(401)
})

app.get('/user',requireAuth,checkUser)

app.use('/auth',authRouter);
app.use('/test',requireAuth,testroute)

// database connection
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000,()=>{
    console.log('====================================');
    console.log('http://localhost:3000/');
    console.log('====================================');
  }))
  .catch((err) => console.log(err));
