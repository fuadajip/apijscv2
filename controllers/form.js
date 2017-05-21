const formModels = require('../models/form');

var formControllers = {
    addStructureForm: (newStructure, callback) => {
        newStructure.save(callback);
    },
    getDetailForm: (idlistsurvey, callback) => {
        const query = { idlistsurvey: idlistsurvey }
        formModels.findOne(query, callback);
    }
}

module.exports = formControllers;