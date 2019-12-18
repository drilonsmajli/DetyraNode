const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwtVerify(req.token, req, res, next);
    }
    else
    {
        res.json({ error: 'Something went wrong' });
    }
}

function jwtVerify(token, req, res, next){
    const secretKey = `user-2020`;
    jwt.verify(token, secretKey, (err, authData) => {
        if(err){
            res.json({ error: 'Not Authenticated' });
        }
        else
        {
            next();
        }
    })
};

module.exports = verifyToken;