var nodemailer = require("nodemailer");
const config = require('../config');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: config.gmail.email,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.gmail.refreshToken,
        accessToken: config.gmail.accessToken
    }
});

module.exports = ({to, subject, text, html, attachments}) => {
    to.map(user => {
        const mail = {
            from: `fastsociety <${config.gmail.email}>`,
            to: user,
            subject,
            text,
            html,
            attachments
        }
        transporter.sendMail(mail, function(err, info) {
            if (err)
                console.log(err);
        })
    })    
}

