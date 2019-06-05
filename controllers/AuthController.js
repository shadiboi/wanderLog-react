const express = require('express');
const router = express.Router();
const User   = require('../models/User');
const bcrypt = require('bcryptjs');

//Login
router.post('/login', async (req, res) => {
    try{
        const foundUser = await User.findOne({username : req.body.username});
        if(foundUser){
            if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
                req.session.logged = true;
                req.session.username = foundUser._id 
                res.json({
                           status: 200,
                           data: foundUser
                })         
            }
        }
        res.send({
            status: 500,
            data: "No such user or password"
        })
    }catch(err){
        console.log(err);
        res.send(err);
    }
})

//Logout
router.post('/logout', (req, res) => {
    req.session.logged = false;
    req.session.destroy;
})

module.exports = router;
