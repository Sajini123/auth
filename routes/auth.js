const router  = require('express').Router();
const User = require('../models/User');
const jwt  = require('jsonwebtoken');
const {registerValidation,loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');

router.post('/register',async (req,res)=>{
    
    // validation
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check user exist in database
    const userExist = await User.findOne({email:req.body.email});
    if(userExist) return res.status(400).send('This email already exist.use different email');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    // console.log(req.body)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err)
    }
});

// Login
router.post('/login',async (req,res)=>{
    // validation
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // check user exist in database
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('This email is incorrect');

    // check pasword correct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid Password');

    // create and assign token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);

    // res.send('Logged in');


})




module.exports = router;