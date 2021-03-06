const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
require('dotenv').config()


require('./db/db')

const corsOptions = {
  origin: process.env.REACT_APP_FRONTEND_ADDRESS, 
  credentials: true, 
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }));

app.use(express.static(path.join(__dirname, 'client/build')));
  
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const UserController = require('./controllers/UserController');
app.use('/users', UserController);

const AuthController = require('./controllers/AuthController')
app.use('/', AuthController);

const EntriesController = require('./controllers/EntriesController')
app.use('/entries', EntriesController);

app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
});


