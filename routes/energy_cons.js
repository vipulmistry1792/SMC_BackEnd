const express = require('express');
const router = express.Router();
const { energydata,energydata_history,energydata_meter_montly,energydata_meter_day,energydata_meter_day1 } = require('../controllers/energy_cons');


router.route('/energy_data').post(energydata);
router.route('/energy_his').post(energydata_history);
router.route('/energy_metermonthly').post(energydata_meter_montly);
router.route('/energy_meterday').post(energydata_meter_day);
router.route('/energy_meterday1').post(energydata_meter_day1);
// router.route('/login').post(login);
// router.route('/forgotpassword').post(forgotpassword);
// router.route('/resetpassword/:resetToken').put(resetpassword)s;

module.exports=router;