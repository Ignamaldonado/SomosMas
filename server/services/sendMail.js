const nodemailer = require('nodemailer')

async function sendMail(to, subject, text, html) {
        const config = { 
        host: 'smtp.gmail.com',
        port: '587',
        auth: {
            user: 'somosmas2022ong@gmail.com',
            pass: process.env.MAILER_PASSWORD
        }
    }

    const transport = nodemailer.createTransport(config)

    const msg = {
        to,
        from:'somosmas2022ong@gmail.com',
        subject,
        text,
        html,
    }

    try {
        const result = await transport.sendMail(msg)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = sendMail