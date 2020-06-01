const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./model/connect');
const index = require('./routes/index');
const authRoutes = require('./routes/auth.routes');
const routes = require('./routes/question.route');
const BasicAuth = require('./middleware/basicauth');
require('dotenv').config();

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET || 'odimawodiawpo',
    cookie: {
        maxAge: 10000 * 30000,
    },
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
    origin: "http://localhost:"+ (process.env.CLIENT || 3000),
    credentials: true
};
app.use(cors(corsOptions));

app.use('/', authRoutes)
app.use(BasicAuth)
app.use('/', index)
app.use('/', routes)

connectDB().then(async function() {
    app.listen(process.env.PORT || 5000, function() {
        console.log('Listening on ', process.env.PORT);
    });
});