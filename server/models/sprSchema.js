const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//User Schema or Document Structure
const sprSchema = new mongoose.Schema({
    fname : {
        type : String,
        required : true,
        unique : true,
    },
    lname : {
        type : String,
        required : true,
        unique : true,
    },
    pnum : {
        type : String,
        required : true,
        unique : true,
    },
    gender : {
        type : String,
        required : true,
        unique : true,
    },
    service : {
        type : String,
        required : true,
        unique : true,
    },
    experience : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    },
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ]
})

// Hashing Password to Server
sprSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = bcryptjs.hashSync(this.password, 10);
    }
    next();
})

// Generate Tokens to Verify User
sprSchema.methods.generateToken = async function(){
    try {
        let generatedToken = jwt.sign({_id : this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token : generatedToken});
        await this.save();
        return generatedToken;
    } catch (error) {
        console.log(error)
    }
}

// Create Model
const Spr = new mongoose.model("SPR",sprSchema)

module.exports = Spr;