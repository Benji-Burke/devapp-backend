const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(process.env.PORT || 5000, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, 
  auth: {
    type: "login",
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message; 
  const mail = {
    from: name,
    to: "username@example.com",
    subject: "Contact Form Message",
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "failed" });
    } else {
      res.json({ status: "sent" });
    }
  })

  transporter.sendMail({
    from: "devappagency@gmail.com",
    to: email,
    subject: "Submission was successful",
    text: `Thank you for contacting us!\n\nForm details\nName: ${name}\n Email: ${email}\n Message: ${message}`
  }, function(error, info){
    if(error) {
      console.log(error);
    } else{
      console.log('Message sent: ' + info.response);
    }
  });
});