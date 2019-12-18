const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define('user',{
    name:{
        type: Sequelize.STRING,
    },
    username:{
        type: Sequelize.STRING,
    },
    password:{
        type: Sequelize.STRING,
    }
});

module.exports = User;