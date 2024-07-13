const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require("body-parser");
const moment = require("moment");
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = ['https://courageous-kringle-bab0ed.netlify.app/', 'https://twibbleproject.vercel.app/'];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true
// }));

// app.use(cors({credentials: true}));

app.use(cors())

app.use(express.json());

const nodemailer = require("nodemailer");
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(email, otp, subject) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'twibblea@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: '"Twibble Admin" <twibblea@gmail.com>',
      to: email,
      subject: subject,
      text: `Your OTP code is: ${otp}`,
      html: `<b>Your OTP code is: ${otp}</b>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log('Error sending mail:', error);
    throw error;
  }
}

async function sendInvoice(email, plan, amount) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'twibblea@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: '"Twibble Admin" <twibblea@gmail.com>',
      to: email,
      subject: "Twibble Invoice",
      html: `
        <h3>Invoice for your Twibble Plan</h3>
        <p>Thank you for purchasing the ${plan} plan.</p>
        <p><b>Amount:</b> ₹${amount}</p>
        <p>If you have any questions, feel free to contact us.</p>
      `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log('Error sending invoice:', error);
    throw error;
  }
}


const [free, pro, premium] = ['price_1PTqmU01FeXgnltSGQubFSCh', 'price_1PTqt501FeXgnltS46iEvjns', 'price_1PTqum01FeXgnltS7svng9Am'];
const stripe = require("stripe")(process.env.STRIPE_PRIKEY);

const uri = "mongodb+srv://twibble_site:QbLtXMRpZeuWRliM@twiibble.irfc9uk.mongodb.net/?retryWrites=true&w=majority&appName=Twiibble";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const postCollection = client.db('database').collection('posts');
    const userCollection = client.db('database').collection('users');
    const otpCollection = client.db('database').collection('otps');
    const notificationsCollection = client.db('database').collection('notifications');


    app.post('/api/otp/sendotp', async (req, res) => {
      try {
        const { email } = req.body;
    
        if (!email) {
          throw new Error('Email is required');
        }
    
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
        const otpExpiration = new Date(Date.now() + 5 * 60000);
    
        const filter = { email };
        const updateDoc = { $set: { otp, otpExpiration } };
        const options = { upsert: true };
    
        await otpCollection.updateOne(filter, updateDoc, options);
    
        await sendMail(email, otp, "Twibble OTP Verification for Changing Language");
    
        res.status(200).json({ success: true, message: `OTP sent to ${email}` });
      } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(400).json({ success: false, message: error.message });
      }
    });

    app.post('/api/login', async (req, res) => {
      try {
        const { email, password, browser, os, device, userAgent, ip } = req.body;
        const user = await userCollection.findOne({ email });
    
        if (!user) {
          console.log('User not found');
          return res.status(401).send('Invalid credentials');
        }
    
        if (!password || !user.password) {
          console.log('Password or user password is undefined');
          return res.status(401).send('Invalid credentials');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send('Invalid credentials');
    
        const currentTime = moment();
        if (device === 'mobile' && currentTime.hour() >= 22) return res.status(403).send('Access restricted during night hours for mobile devices');
    
        const loginInfo = { browser, os, device, userAgent, ip, timestamp: new Date() };
        await userCollection.updateOne({ email }, { $push: { loginHistory: loginInfo } });
    
        // Check if the browser is Firefox or Brave
        if (!/firefox|brave/i.test(userAgent)) {
          const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
          const otpExpiration = new Date(Date.now() + 5 * 60000);
          await otpCollection.updateOne({ email }, { $set: { otp, otpExpiration } }, { upsert: true });
    
          await sendMail(email, otp, "Twibble OTP Verification");
    
          return res.status(200).json({ otpRequired: true });
        } else {
          // Log the user in directly if using Firefox or Brave
          const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
          return res.status(200).json({ otpRequired: false, token });
        }
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    });
    
    
    app.post('/api/otp/verifyOtp', async (req, res) => {
      try {
        const { email, otp } = req.body;
    
        if (!email || !otp) {
          return res.status(400).json({ valid: false, message: 'Email and OTP are required' });
        }
    
        const currentDate = new Date();
        const otpDoc = await otpCollection.findOne({
          email,
          otp,
          otpExpiration: { $gt: currentDate }
        });
    
        if (otpDoc) {
          res.status(200).json({ valid: true});
        } else {
          res.status(400).json({ valid: false, message: 'Invalid OTP or OTP expired' });
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    });
    
    app.post('/otp/verifyOtp', async (req, res) => {
      try {
          const { email, otp } = req.body;
  
          if (!email || !otp) {
              throw new Error('Email and OTP are required');
          }
  
          const user = await otpCollection.findOne({ email });
  
          if (user && user.otp === otp && new Date() < new Date(user.otpExpiration)) {
              res.status(200).json({ valid: true });
          } else {
              res.status(400).json({ valid: false });
          }
      } catch (error) {
          console.error('Error verifying OTP:', error);
          res.status(400).json({ success: false, message: error.message });
      }
  });


  app.get('/notifications', async (req, res) => {
    const notifications = await notificationsCollection.find().sort({ timestamp: -1 }).toArray();
    res.send(notifications);
  });


    app.get('/post', async (req, res) => {
      const post = (await postCollection.find().toArray()).reverse();
      res.send(post);
    });

    app.get('/user', async (req, res) => {
      const user = await userCollection.find().toArray();
      res.send(user);
    });

    app.get('/loggedInUser', async (req, res) => {
      const email = req.query.email;
      const user = await userCollection.find({ email }).toArray();
      res.send(user);
    });

    app.get('/userPost', async (req, res) => {
      const email = req.query.email;
      const post = (await postCollection.find({ email }).toArray()).reverse();
      res.send(post);
    });

    app.post('/post', async (req, res) => {
      const post = req.body;
    
      const user = await userCollection.findOne({ email: post.email });
    
      const result = await postCollection.insertOne(post);
    
      const notification = {
        username: user.username,
        message: ` ${user.name} has shared a post.`,
        timestamp: new Date(),
      };
    
      await notificationsCollection.insertOne(notification);
    
      res.send(result);
    });
    
    app.post('/register', async (req, res) => {
      const { username, name, email, password, plan, language } = req.body;
    
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        const newUser = {
          username,
          name,
          email,
          password: hashedPassword, // Store the hashed password
          plan,
          language
        };
    
        const result = await userCollection.insertOne(newUser);
        res.send(result);
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal server error');
      }
    });

    app.patch('/user', async (req, res) => {
      const email = req.query.email;
      const user = req.body;
      const query = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          plan: user.plan,
          language: user.language,
        },
      };
      const result = await userCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    const stripeSession = async (plan) => {
      try {
        const session = await stripe.checkout.sessions.create({
          mode: "subscription",
          payment_method_types: ["card"],
          line_items: [
            {
              price: plan,
              quantity: 1
            },
          ],
          success_url: "https://courageous-kringle-bab0ed.netlify.app/success",
          cancel_url: "https://courageous-kringle-bab0ed.netlify.app/cancel"
        });
        return session;
      } catch (e) {
        return e;
      }
    };
    
    app.post("/createStripeSession", async (req, res) => {
      const { plan, customerId } = req.body;
      let planId = null;
      let planName = "";
      let planAmount = 0;
      if (plan == 0) {
        planId = free;
        planName = "Free";
        planAmount = 0;
      } else if (plan == 199) {
        planId = pro;
        planName = "Pro";
        planAmount = 199;
      } else if (plan == 499) {
        planId = premium;
        planName = "Premium";
        planAmount = 499;
      }
    
      try {
        const session = await stripeSession(planId);
        await userCollection.updateOne(
          { email: customerId },
          { $set: { "subscription.sessionId": session.id, plan: planAmount, planName } }
        );
        return res.json({ session });
      } catch (error) {
        res.send(error);
      }
    });
    
  
    app.post("/payment-success", async (req, res) => {
      const { sessionId, firebaseId } = req.body;
      if (!sessionId) {
        return res.status(400).json({ error: "sessionId is required" });
      }
    
      if (!firebaseId) {
        return res.status(400).json({ error: "firebaseId is required" });
      }
    
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
    
        if (session.payment_status === 'paid') {
          const subscriptionId = session.subscription;
    
          try {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
            const user = await userCollection.findOne({ email: firebaseId });
    
            if (!user) {
              return res.status(404).json({ error: "User not found" });
            }
    
            const planAmount = subscription.plan.amount / 100;
            const planName = user.planName || "Unknown Plan";
    
            const filter = { email: firebaseId };
            const updateDoc = {
              $set: {
                plan: planAmount,
                subscription: { sessionId: null }
              }
            };
            const options = { upsert: true };
    
            const result = await userCollection.updateOne(filter, updateDoc, options);
    
            // Send invoice email
            await sendInvoice(user.email, planName, planAmount);
    
            return res.json({ message: "Payment successful", result });
          } catch (error) {
            return res.status(500).json({ error: 'Error retrieving subscription' });
          }
        } else {
          return res.status(400).json({ message: "Payment failed" });
        }
      } catch (error) {
        return res.status(500).json({ error: 'Error processing payment' });
      }
    });
      

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } finally {
    // Ensuring that the client will close when you finish/error
  }
}

run().catch(console.dir);

