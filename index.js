require('dotenv').config();
const express = require("express");
const app = express();
const PORT = 3001;
const { createTransport } = require("nodemailer");
const cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
console.log(process.env.user,process.env.pass);
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

app.post("/sendmail", async (req, res) => {
  let info = await transporter.sendMail({
    from: `${req.body.Name} <${transporter.options.auth.user}>`, // sender address
    to: "chopadesahil2002@gmail.com", // list of receivers
    subject: `${req.body.Subject}`, // Subject line
    text: "Hello world?", // plain text body
    html: `${req.body.Message} <br> Sender's Email: <strong>${req.body.Email}</strong>`, // html body
  });
  try {
    const result = await transporter.sendMail(info);
    res.send({ message: "Your Message is Sent!!", status: true });
  } catch (error) {
    res.send({ message: "OOPs!! Faced some issue.", status: false });
  }
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
