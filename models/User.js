
const {Schema,model} = require('mongoose');
const {isEmail,isStrongPassword} = require('validator');
const {genSalt,hash,compare} = require('bcrypt');
const user_schema = new Schema({
    
    username:{
        type:String,
        required:[true,'Please enter an username'],
        minLength:[8,'minimum length is 8']
    },
    email:{
        type:String,
        required:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter an valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        validate:[isStrongPassword,'Please enter a strong password']
    }
})

user_schema.pre('save',async function(next){
    const salt = await genSalt();
    this.password = await hash(this.password,salt);
    next();
})

user_schema.statics.findByEmail = async function(email,password){
    const user = await this.findOne({email})
    if (user) {
        const auth = await compare(password,user.password);
        console.log('====================================');
        console.log(auth);
        console.log('====================================');
        if (auth) {
            return user;
        }
        throw Error('wrong password');
    }
    throw Error('user not exists');
}

const user_model = model('user',user_schema)

module.exports = user_model;


