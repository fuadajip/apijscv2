const mongoose = require('mongoose');

const formStructureSchema = mongoose.Schema({
    idlistsurvey: { type: String },
    title: { type: String },
    createdby: { type: String },
    fields: [],
    created: { type: Date, default: Date.now },
    edited: { type: Date, default: Date.now },
})

module.exports = mongoose.model('FormStructure', formStructureSchema);