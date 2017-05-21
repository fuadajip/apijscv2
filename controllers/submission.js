var submissionModels = require('../models/submission');

var submissionControllers = {
    addSubmission: (newSubmissionForm, callback) => {
        newSubmissionForm.save(callback);
    }
}

module.exports = submissionControllers;