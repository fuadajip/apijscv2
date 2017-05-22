const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const employeeController = require('../controllers/employee');
const employeeModel = require('../models/employee');


router.use(passport.initialize());
require('../config/passport')(passport);

router.get('/', (req, res) => {
    res.send('Invalid Enpoint');
});

router.get('/all', (req, res, next) => {
    employeeModel.find(function(err, dataEmployee) {
        if (err) res.send(err);
        res.json(dataEmployee);
    })
});

router.post('/register', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let newEmployee = new employeeModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        position: req.body.position,
        unitskpd: req.body.unitskpd,
        phone: req.body.phone,
        address: req.body.address,
        statusemployee: req.body.statusemployee
    })
    employeeController.addEmployee(newEmployee, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Error Registering Employee' })
        } else {
            res.json({ success: true, msg: 'User registered', data: newEmployee });
        }
    })
});

router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    employeeController.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' })
        }
        employeeController.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 21600 //6 hours
                })

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        position: user.position,
                        unitskpd: user.unitskpd,
                        statusemployee: user.statusemployee,
                        position: user.position,
                    }
                })
            } else {
                return res.json({ success: false, msg: 'Wrong Credentials' });
            }
        })
    })
});

router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;

    employeeController.deleteEmployee(id, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }
        if (user.length != 0) {
            res.json({
                success: true,
                msg: 'Employee Deleted'
            })
        }
    })

})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    employeeController.getUserById(id, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }
        if (user.length != 0) {
            res.json({
                success: true,
                data: user
            })
        }
    })
})

module.exports = router;