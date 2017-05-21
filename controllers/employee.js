var employeeModels = require('../models/employee');
const bcrypt = require('bcryptjs');

var employeeControllers = {
    addEmployee: (dataEmployee, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(dataEmployee.password, salt, (err, hash0 => {
                if (err) throw err;
                dataEmployee.password = hash;
                dataEmployee.save(callback);
            }))
        })
    },
    deleteEmployee: (id, callback) => {
        const query = { _id: id }
        employeeModels.findOneAndRemove(query, callback);
    },
    getUserByEmail: (email, callback) => {
        const query = { email: email }
        employeeModels.findOne(query, callback);
    },
    comparePassword: (candidatePassword, hash, callback) => {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) throw err;
            callback(null, isMatch);
        })
    }
}

module.exports = employeeControllers;