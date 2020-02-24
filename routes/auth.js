const router  = require('express').Router();
const User = require('../models/User')
const {registerValidation,loginValidation} = require('../validation');


router.post('/register',(req,res)=>{
    
    // validation
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // console.log(req.body)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    try{
        const savedUser = user.save();
        res.send("User saved");
    }catch(err){
        res.status(400).send(err)
    }
});




module.exports = router;