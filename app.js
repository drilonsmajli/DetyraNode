const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./config/auth');
app.use(bodyParser.json({ extended: true }));
app.use(cors());
app.use(express.static('./uploads'));

//log all requests
app.use((req, res, next) => {
    // console.log(req.method, req.url);
    next();
});

const db = require('./config/db');
require('./config/relationships')(db);

app.use('/api/user', require('./routes/user'))
app.use('/api/products', require('./routes/product'))


const port = process.env.PORT || 8000;
app.listen(port);