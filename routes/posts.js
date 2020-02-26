const router  = require('express').Router();
const verify = require('../verifyToken')

router.get('/',verify,(req,res)=>{
    res.json({
        post: 'This is my post',
        descrtiotion:'Post description'
    });
});

module.exports = router;