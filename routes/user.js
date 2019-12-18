const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verifyToken = require('../config/auth');
const Users = require('../models/user');

router.get('/', (req, res, next) => {
    Users.findAll()
        .then(data => res.json(data))
        .catch(err => res.json(err))
})

router.post('/', (req, res, next) => {
    Users.findOne({ where: { username: req.body.username }})
        .then(data => {
            if(data){
                res.json('Username is taken');
            }
            else
            {
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        const data = {
                            name: req.body.name,
                            username: req.body.username,
                            password: hash
                        }
                        Users.create(data)
                            .then(data => res.json(data))
                            .catch(err => res.json(err))
                    });
                });
            }
        })
        .catch(err => res.json(err))
});

router.post('/login', (req, res, next) => {
    const { username, password} = req.body;
    const secretKey = `user-2020`;
    if(username && password){
        Users.findOne({ where: { username: username }})
        .then(data => {
           if(data){
                bcrypt.compare(password, data.password, function(err, isMatch) {
                    if(isMatch){
                        jwt.sign({ id: data.id, username: data.username }, secretKey, { expiresIn: '3600s' }, (err, token) => {
                            res.json({
                                token: token
                            })
                        })
                    }
                    else
                    {
                        res.json({ error: "Incorrect Password" });
                    }
                });
           }
           else
           {
                res.json({ error: "This user does not exist" });
           }
        })
        .catch(err => res.json(err))
    }
    else
    {
        res.json({ message: "All daata must be filled" });
    }
})

router.delete('/', (req, res, next) => {
    Users.destroy({ where: { id: req.query.id }})
        .then(data => res.json(data))
        .catch(err => res.json(err))
})

module.exports = router;