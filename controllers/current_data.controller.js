const express = require('express');
const router = express.Router();
const currentDataService = require('../esr_data_read');

router.post('/esr', getesrdata);
router.post('/wds', getAllwds);
router.post('/wtpdata', getAllwtp);
router.post('/sensordata', getAllsensor);
module.exports = router;
function getesrdata(req, res, next) {
    currentDataService.createOPCUAClient(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function getAllwds(req, res, next) {
    currentDataService.WDScreateOPCUAClient(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function getAllwtp(req, res, next) {
    currentDataService.getWTPData(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function getAllsensor(req, res, next) {
    currentDataService.getSensorData(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}