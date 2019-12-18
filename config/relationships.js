module.exports = (db) => {

    db.user = require('../models/user');
    db.post = require('../models/product');

    db.user.hasMany(db.post, { foreignKey: 'user_id',sourceKey: 'id' });
    db.post.belongsTo(db.user, { foreignKey: 'user_id',targetKey: 'id' });
}