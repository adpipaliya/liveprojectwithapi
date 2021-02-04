const router = require('express').Router();
const User = require('./Model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post("/register",async (req,res)=> {

    const salt = await bcrypt.genSalt(10);
    const hashedPswd = await bcrypt.hash(req.body.pswd,salt);
    const user = new User({
        uname:req.body.uname,
        pswd:hashedPswd
    })

    await user.save();
    res.send(user);

});

router.post("/login",async (req,res)=>{

    const user = await User.findOne({uname:req.body.uname});
    if (!user) {
        return res.send("User does not exists");
    }
    else{
        const isValid = await bcrypt.compare(req.body.pswd,user.pswd);
        if (!isValid) {
            res.send("Entered password is incorrect");
        }
        else{
            // res.send("Login Successfully");
            const token = await jwt.sign({_id:user._id},"privatekey");
            res.header('auth-token',token);
            res.send(token);
        }
    }

});

module.exports = router;