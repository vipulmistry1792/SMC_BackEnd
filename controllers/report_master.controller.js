const express = require('express');
const router = express.Router();
const currentDataService = require('../services/report_master.service');

router.get('/getreportdata', getreportdata);
router.post('/getreportbyid', getreportbyid);
router.post('/getreportbywdsid', getreportbywdsid);
router.post('/reportcreate', createreport);
router.post('/reportupdate', updatereport);
router.post('/getdata', reportdata);
module.exports = router;
function getreportdata(req, res, next) {
    currentDataService.getAll_Report(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function getreportbyid(req, res, next) {
    currentDataService.getreportsById(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function getreportbywdsid(req, res, next) {
    currentDataService.getreportsBywdsid(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function createreport(req, res, next) {
    currentDataService.create_reports(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function updatereport(req, res, next) {
    currentDataService.update_reports(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function reportdata(req, res, next) {
    currentDataService.getreportsData( req.body)
        .then((users) => res.json(users))
        .catch(err => next(err));
}