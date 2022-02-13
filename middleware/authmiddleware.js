
require('dotenv').config()
const { redirect } = require('express/lib/response');
const jwt = require('jsonwebtoken');
const user_model = require('../models/User');

const secret = process.env.SECRET; //env vars

const requireAuth = (req,res,next)=>{
    
    const token = req.cookies.jwt; // cookie parse
    if (token) {
        //verify token
        jwt.verify(token,secret,(err,decTok)=>{
            if (err) {
                redirect('/unauth')
            }
            else {
                next();
            }
        })
    }
    else{
        res.redirect('/unauth')
    }
}

const checkUser = (req,res,next)=>{
    
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token,secret,async(err,decodeToken)=>{
            if(!err) {
                const {id} = decodeToken;
                const user = await user_model.findById(id)
                res.send(user)
                next()
            }
        })
    }
    else{
        next()
    }

}


module.exports = {requireAuth,checkUser}