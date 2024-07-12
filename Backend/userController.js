const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require('mongodb');
const otpGenerator = require('otp-generator');
const twilio = require('twilio');

dotenv.config();

const accountSid = process.env.twilio_SID;
const authToken = process.env.twilio_auth;
const twilioClient = new twilio(accountSid, authToken);

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function sendotp(req, res) {
  try {
    const { phoneNumber } = req.body;
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    const otpExpiration = new Date(Date.now() + 5 * 60000); // OTP valid for 5 minutes

    await client.connect();
    const database = client.db('database');
    const otps = database.collection('otps');

    const filter = { phoneNumber };
    const updateDoc = {
      $set: {
        otp,
        otpExpiration
      }
    };
    const options = { upsert: true };

    await otps.updateOne(filter, updateDoc, options);

    await twilioClient.messages.create({
      body: `Your OTP is: ${otp}`,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER
    });

    return res.status(200).json({
      success: true,
      msg: `OTP sent to ${phoneNumber}`
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message
    });
  } finally {
    await client.close();
  }
}

async function generateOtp(req, res) {
  try {
    const { phoneNumber } = req.body;
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false });
    const otpExpiration = new Date(Date.now() + 5 * 60000); // Default 5 minutes expiration

    await client.connect();
    const database = client.db('database');
    const otps = database.collection('otps');

    const otpDoc = {
      phoneNumber,
      otp,
      otpExpiration
    };

    const result = await otps.insertOne(otpDoc);
    res.send(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message
    });
  } finally {
    await client.close();
  }
}

async function verifyOtp(req, res) {
  try {
    const { phoneNumber, otp } = req.body;
    const currentTime = new Date().getTime();

    await client.connect();
    const database = client.db('database');
    const otps = database.collection('otps');

    const otpDoc = await otps.findOne({
      phoneNumber,
      otp,
      otpExpiration: { $gt: currentTime }
    });

    if (otpDoc) {
      res.send({ valid: true });
    } else {
      res.send({ valid: false });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message
    });
  } finally {
    await client.close();
  }
}

module.exports = { sendotp, generateOtp, verifyOtp };
