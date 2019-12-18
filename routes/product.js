const express = require('express');
const router = express.Router();

const jwtDecode = require('jwt-decode');
const auth = require('../config/auth');
const Product = require('../models/product');

router.get('/', auth, (req, res, next) => {
    let token = req.headers['authorization'].split(" ")[1];
    let tokenData = jwtDecode(token);
    let user_id = tokenData.id;

    Product.findAll({ where: { user_id: user_id }})
        .then(data => res.json(data))
        .catch(err => res.json(err))
})


router.post('/', auth, (req, res, next) => {
      let token = req.headers['authorization'].split(" ")[1];
      let tokenData = jwtDecode(token);
      let user_id = tokenData.id;
  
      Product.create({ 
        user_id: user_id,
        name: req.body.name,
        description: req.body.description
      })
          .then(data => res.json(data))
          .catch(err => res.json(err))
})


module.exports = router;

const exhangRate = [ { id: 1, rate: 122, name: 'Jon' },{id:2,rate:123,name:'Ragnar'},{id:3,rate:121,name:'Drilon'}];
router.get("/freeapi",auth,  (req, res, next) => {
  let token = req.headers['authorization'].split(" ")[1];
  let tokenData = jwtDecode(token);
  let user_id = tokenData.id;
  res.json(exhangRate)
})
