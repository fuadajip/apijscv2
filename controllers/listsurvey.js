var listSurveyModels = require('../models/listsurvey');

var listSurveyControllers = {
    addListSurvey: (newListSurvey, callback) => {
        newListSurvey.save(callback);
    },
    getListSurvey: (unitskpd, callback) => {
        const query = { unitskpd: unitskpd }
        listSurveyModels.find(query, callback);
    }
}

module.exports = listSurveyControllers;