import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'barry90@ethereal.email',
        pass: 'EE3QqTN79qbpsSAmyM'
    }
});

const sendMail = async (to, subject, text) => {
    const mailOptions = {
        from: 'barry90@ethereal.email',
        to,
        subject,
        text
    };
    //console.log(mailOptions);
    const info = await transporter.sendMail(mailOptions);
    //console.log(info);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


export default sendMail;
