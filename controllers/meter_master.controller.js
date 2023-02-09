const express = require('express');
const router = express.Router();
const meterService = require('../services/meter_master.service');

router.get('/type', getAlltype);
router.get('/wdsdata', getwdsData);
router.post('/wds', getAllwds);
router.post('/wdsById', getwdsById);
router.post('/supplytime', getsupplytime);
module.exports = router;

function getAlltype(req, res, next) {
    meterService.getAll_type()
        .then(users => res.json(users))
        .catch(err => next(err));
}
function getAllwds(req, res, next) {
    meterService.getAll_wds(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function getwdsById(req, res, next) {
    meterService.getwdsdataById(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function getsupplytime(req, res, next) {
    meterService.supplytimeupdate(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
function getwdsData(req, res, next) {
    meterService.getAlldata(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}

