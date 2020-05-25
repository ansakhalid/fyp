const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();
// import routes
const userprofiling = require('./routes/userprofiling');
const user = require('./routes/user');
const category = require('./routes/category');
const product = require('./routes/product');
const paypal = require('./routes/paypal');
const order = require('./routes/order');
const rating = require('./routes/rating');
const check = require('./routes/check');
const app = express();


mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify:false
    })
    


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());


app.use('/artink', userprofiling);
app.use('/artink', user);
app.use('/artink', category);
app.use('/artink', product);
app.use('/artink', paypal);
app.use('/artink', order);
app.use('/artink', rating);
app.use('/artink', check);
const port = process.env.PORT || 5000;

app.listen(port, () => {
 });