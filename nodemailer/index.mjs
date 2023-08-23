import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
  auth: {
    user: "postmaster",
    pass: "password",
  },
});

const info = await transporter.sendMail({
  from: "foo <foo@example.com>",
  to: "bar <bar@example.com>",
  subject: "Hello world!",
  html: "<marquee>Hello world.</marquee>",
});

console.log(info.messageId);
