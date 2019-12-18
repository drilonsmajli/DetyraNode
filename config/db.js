const Sequelize = require('sequelize');

const db = new Sequelize('exam','root','', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define:{
        freezeTableName: true
    }
})

db.authenticate()
    .then(() => console.log('Connected Successfully'))
    .catch(err => console.log(err))

module.exports = db;