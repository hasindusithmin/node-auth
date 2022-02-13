
const {Router} = require('express')
const user_model = require('../models/User')

const authRouter = Router();


authRouter.head('/',(req,res)=>{
    res.sendStatus(200);
})

authRouter.get('/set',(req,res)=>{
    res.cookie('demo','12346789',{httpOnly:true,maxAge:5*1000*60})
    res.send('successfully set the cookies')
})
authRouter.get('/get',(req,res)=>{
    const cookie = req.cookies
    console.log('====================================');
    console.log(cookie);
    console.log('====================================');
    res.json(cookie)
})



authRouter.post('/signup',async(req,res)=>{
    const {username,email,password} = req.body;
    try {
        const user =  await user_model.create({username,email,password});
        res.status(201).json({msg:'user successfully created'})
    } catch (error) {
        res.status(400).json({msg:error.message,code:error.code})
    }
})

authRouter.post('/login',(req,res)=>{

})


module.exports = authRouter;
