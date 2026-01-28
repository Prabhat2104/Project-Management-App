import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS
    }
});

const sendMail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_ID,
        to,
        subject,
        text
    };
    //console.log(mailOptions);
    const info = await transporter.sendMail(mailOptions);
    //console.log(info);
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


export default sendMail;
