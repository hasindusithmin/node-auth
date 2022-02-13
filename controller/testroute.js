

const {Router} = require('express');

const testRoute = Router()

testRoute.get('/',(req,res)=>{res.sendStatus(200)})
testRoute.get('/due',(req,res)=>{res.sendStatus(201)})
testRoute.get('/tre',(req,res)=>{res.sendStatus(202)})

module.exports = testRoute;