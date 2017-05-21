const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/database');

//Importing Routes
const employee = require('./routes/employess');


const app = express();
const port = process.env.PORT || 3020;

//Connect to database
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database : ' + config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Error to connection to database');
});

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
require('./config/passport');

app.use('/api/v2/employee', employee);

app.get('/', (req, res) => {
    res.sendfile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log('Server running on port ' + port)
})