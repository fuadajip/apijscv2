const express = require('express');
const router = express.Router();
const employeeModel = require('../models/employee');
const config = require('../config/database');

router.get('/', (req, res) => {
    res.send('Invalid Enpoint');
})

module.exports = router;