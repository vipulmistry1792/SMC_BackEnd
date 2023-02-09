const express = require('express');
const router = express.Router();
const AlarmDataService = require('../send_sms');

router.post('/', SendSms_Data);

module.exports = router;
function SendSms_Data(req, res, next) {
    AlarmDataService.send_message(req.body)
    res.send("Message Send");
}
