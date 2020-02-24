const router  = require('express').Router();
const User = require('../models/User')

router.post('/register',(req,res)=>{
    console.log(req.body)
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