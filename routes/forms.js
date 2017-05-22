const express = require('express');
const router = express.Router();

const formController = require('../controllers/form');
const formModel = require('../models/form');

router.get('/', (req, res, next) => {
    res.send("Invalid Enpoint");
})
router.get('/structure/:id', (req, res, next) => {
    const id = req.params.id;
    formController.getDetailForm(id, (err, detailStructureForm) => {
        if (err) throw err;
        if (!detailStructureForm) {
            return res.json({ success: false, msg: 'Doesn\'t have detail survey form' });
        } else {
            res.json({
                success: true,
                detailStructureForm
            })
        }
    })
})
router.post('/add', (req, res, next) => {
    let addForm = new formModel({
        idlistsurvey: req.body.idlistsurvey,
        title: req.body.title,
        fields: req.body.fields,
        createdby: req.body.createdby,
    });

    formController.addStructureForm(addForm, (err, data) => {
        if (err) {
            res.json({ success: false, msg: 'Check Your Input' });
        } else {
            res.json({ success: true, data: data });
        }
    })
})

// router.post('/structure', (req, res) => {
//     const idlistsurvey = req.body.idlistsurvey;
//     formController.getDetailForm(idlistsurvey, (err, detailStructureForm) => {
//         if (err) throw err;
//         if (!detailStructureForm) {
//             return res.json({ success: false, msg: 'Doesn\'t have detail survey form' });
//         } else {
//             res.json({
//                 success: true,
//                 detailStructureForm
//             })
//         }
//     })
// })


module.exports = router;