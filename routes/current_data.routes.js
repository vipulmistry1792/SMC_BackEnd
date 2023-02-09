const express = require('express');
const router = express.Router();
const { getesrdata } = require('../controllers/current_data.controller');


router.route('/esr').post(getesrdata);
//router.route('/wds').post(getAll_wds);
// router.route('/login').post(login);
// router.route('/forgotpassword').post(forgotpassword);
// router.route('/resetpassword/:resetToken').put(resetpassword)s;

module.exports=router;