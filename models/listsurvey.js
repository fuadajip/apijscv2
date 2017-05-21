const mongoose = require('mongoose');

const listsurveySchema = mongoose.Schema({
    unitskpd: { type: String },
    title: { type: String },
    createdby: { type: String },
    created: { type: Date, default: Date.now },
    edited: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ListSurvey', listsurveySchema);