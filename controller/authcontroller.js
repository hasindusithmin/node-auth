
const {Router} = require('express')
const user_model = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authRouter = Router();
const secret = process.env.SECRET;

authRouter.get('/signup',async(req,res)=>{
    const {username,email,password} = req.query;
    try {
        const user =  await user_model.create({username,email,password});
        const token = jwt.sign({id:user._id},secret,{expiresIn:60})
        res.cookie('jwt',token,{maxAge:60*1000,httpOnly:true})
        res.redirect('/auth');
    } catch (error) {
        res.status(400).json({error:error.message,code:error.code})
    }
})

authRouter.get('/login',async(req,res)=>{
    const {email,password} = req.query;
    try {
        const user = await user_model.findByEmail(email,password);
        const token = jwt.sign({id:user._id},secret,{expiresIn:60})
        res.cookie('jwt',token,{maxAge:60*1000})
        res.redirect('/');
    } catch (error) {
        res.status(403).json({error:error.message})
    }
})

authRouter.get('/logout',(req,res)=>{
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/unauth')
})


module.exports = authRouter;
