const express = require('express');
const router = express.Router();
const listSurveyController = require('../controllers/listsurvey');
const listSurveyModel = require('../models/listsurvey');

router.get('/', (req, res, next) => {
    res.send("Invalid Enpoint");
});

router.post('/all', (req, res) => {
    const unitskpd = req.body.unitskpd;

    listSurveyController.getListSurvey(unitskpd, (err, listsurvey) => {
        if (err) throw err;
        if (!listsurvey) {
            return res.json({ success: false, msg: 'Doesn\'t have survey form' });
        }
        if (listsurvey.length != 0) {
            console.log(listsurvey);
            res.json({
                success: true,
                listsurvey
            })
        } else {
            res.json({
                success: false,
                msg: 'Data tidak Ditemukan'
            })
        }
    })
});


router.post('/add', (req, res, next) => {
    let addSurvey = new listSurveyModel({
        unitskpd: req.body.unitskpd,
        title: req.body.title,
        createdby: req.body.createdby,
    });

    listSurveyController.addListSurvey(addSurvey, (err, data) => {
        if (err) {
            res.json({ success: false, msg: 'Check Your Input' });
        } else {
            res.json({ success: true, data: data });
        }
    })
});

module.exports = router;