const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./controller/authcontroller');
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express();

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api',authRouter);

// database connection
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000,()=>{
    console.log('====================================');
    console.log('http://localhost:3000/');
    console.log('====================================');
  }))
  .catch((err) => console.log(err));
