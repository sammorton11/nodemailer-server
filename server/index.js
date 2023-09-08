require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


const myEmail = process.env.YAHOO_EMAIL;
const yahooEmailPassword = process.env.YAHOO_EMAIL_PASSWORD;

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
   auth: {
      user: process.env.YAHOO_EMAIL, // Use environment variable
      pass: process.env.YAHOO_EMAIL_PASSWORD, // Use environment variable  },
   },
});

// Use the variables in your application
console.log('Yahoo Email:', myEmail);
console.log('Yahoo Email Password:', yahooEmailPassword);

app.post('/send-email', async (req, res) => {

   const {subject, email, message} = req.body;

   try {
      const data = await transporter.sendMail({
         from: 'sjamesmorton95@gmail.com',
         to: process.env.YAHOO_EMAIL,
         subject: subject,
         text: `From: ${email}\n\n${message}`,
      });

      console.log('Email sent!' + data.response);
      res.status(200).json({ message: 'Success'});

   } catch (e) {
      console.error('Error: ', e);
      res.status(500).json({ error: 'An error occurred'});
   }
});

app.listen(port, () => {
   console.log(`Server is running on: ${port}`);
});
