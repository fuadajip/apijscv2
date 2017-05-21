const express = require('express');
const router = express.Router();
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + '.png');
    }
});
var upload = multer({ storage: storage }).single('surveyPhoto');

const submissionController = require('../controllers/submission');
const submissionModel = require('../models/submission');

router.get('/', (req, res, next) => {
    res.send("Invalid Enpoint");
});

router.post('/upload', upload, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.send("Error uploading file.");
            throw err;
        }

    })
    var path = req.file.destination + req.file.filename;
    res.json({ success: true, msg: "File uploaded", path: path });

})

router.post('/submit', (req, res, next) => {
    let submissionData = new submissionModel({
        idlistsurvey: req.body.idlistsurvey,
        title: req.body.title,
        values: req.body.values,
        surveyor: req.body.surveyor,
        loc: req.body.loc,
    })

    submissionController.addSubmission(submissionData, (err, data) => {
        if (err) {
            res.json({ success: false, msg: 'Check Your Input' });
        } else {
            res.json({ success: true, msg: "Success Submit Survey" });
        }
    })
});

module.exports = router;