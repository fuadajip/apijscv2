const mongoose = require('mongoose');

const formSubmissionSchema = mongoose.Schema({
    idform: { type: String },
    idlistsurvey: { type: String },
    title: { type: String },
    surveyor: { type: String },
    loc: { 'type': { type: String, enum: "Point", default: "Point" }, coordinates: { type: [Number], default: [0, 0] } },
    values: Object,
    created: { type: Date, default: Date.now },
    edited: { type: Date, default: Date.now },
});


module.exports = mongoose.model('FormSubmission', formSubmissionSchema);