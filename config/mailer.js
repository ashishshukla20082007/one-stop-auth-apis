const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'smtp4dev',
    host: '127.0.0.1',
    port: process.env.MAIL_PORT_SMTP4DEV,
    secure: false,        
    tls: {
      rejectUnauthorized: false
    }, 
});

module.exports = transporter;
