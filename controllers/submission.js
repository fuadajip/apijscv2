var submissionModels = require('../models/submission');

var submissionControllers = {
    addSubmission: (newSubmissionForm, callback) => {
        newSubmissionForm.save(callback);
    },
    updatePath: (idsubmission, path, callback) => {
        var query = {
            _id: idsubmission
        }
        var setPath = {
            $set: {
                'values.upload': path,
            }
        }
        submissionModels.findByIdAndUpdate(query, setPath, callback);
    }
}

module.exports = submissionControllers;