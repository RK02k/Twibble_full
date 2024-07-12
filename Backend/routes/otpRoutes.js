// otpRoutes.js
const express = require('express');
const router = express.Router();
const { sendotp, generateOtp, verifyOtp } = require('..userController');

router.post('/sendotp', sendotp);
router.post('/generateOtp', generateOtp);
router.post('/verifyOtp', verifyOtp);

module.exports = router;
