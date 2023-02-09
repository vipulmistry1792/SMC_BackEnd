const express = require('express');
const router = express.Router();
const { getAll_type,getAll_wds } = require('../controllers/meter_master.controller');


router.route('/type_data').post(getAll_type);
router.route('/wds').post(getAll_wds);
// router.route('/login').post(login);
// router.route('/forgotpassword').post(forgotpassword);
// router.route('/resetpassword/:resetToken').put(resetpassword)s;

module.exports=router;