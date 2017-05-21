const mongoose = require('mongoose');

// Employee Scheme
const EmployeeSchema = mongoose.Schema({
    name: {
        type: String,
        validation: { required: true, min: 1, max: null },
    },
    email: {
        type: String,
        validation: { required: true, min: 1, max: null, email: true },
    },
    password: {
        type: String,
        validation: { required: true, min: 5, max: null },
    },
    position: {
        type: String,
        validation: { required: true, min: 3, max: null },
    },
    unitskpd: {
        type: String,
        validation: { required: true, min: 3, max: null },
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Date,
        default: Date.now
    },
    statusemployee: {
        type: String,
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);