const loginDetails = require('../models/loginSchema');
const register = require('../models/regSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginCheck = async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await register.findOne({email:email});
        const isMatch = await bcrypt.compare(password,useremail.password);
        let data;
        if(isMatch) {
            const token = jwt.sign({email:email},process.env.SECRET_KEY,{expiresIn: "24h"});
            console.log("usertoken : ",token);
            data = {useremail};
            data.token = token; 
            res.status(200).send(data);
        }         
        else{      
            res.status(401).send('please enter valid password');
        }  
      
    } catch(e){ 
        res.status(500).send("Internet Server error")
    }
};

module.exports = {
    loginCheck
}

