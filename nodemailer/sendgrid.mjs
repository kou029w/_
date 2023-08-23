import nodemailer from "nodemailer";

// see https://support.sendgrid.kke.co.jp/hc/ja/articles/204187885-SMTP%E3%81%AE%E6%8E%A5%E7%B6%9A%E6%83%85%E5%A0%B1%E3%82%92%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84-
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 465,
  secure: true,
  auth: {
    user: "apikey",
    pass: "SG.****", // https://app.sendgrid.com/settings/api_keys > Create API Key > Mail Send > Custom Access > Mail Send
  },
});

const info = await transporter.sendMail({
  from: "foo@example.org",
  to: "bar@example.org",
  subject: "Hello world!",
  html: "<marquee>Hello world.</marquee>",
});

console.log(info.messageId);
