const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator')


const mailerController = {

    home: (req,res,next) => {
      res.render('apimail')
    },


    send: async (req, res) => {
       let errors = validationResult(req)
       const {to, subject, text, html} = req.body
       
      const config = {
        host: 'smtp.gmail.com',
        port: '587',
        auth: {
          user: 'somosmas2022ong@gmail.com',
          pass: process.env.MAILER_PASSWORD
        }
      }

       const transport = nodemailer.createTransport(config)

      if(!errors.isEmpty()) {
        return res.render('apimail', {errors: errors.mapped(), oldBody: req.body})
      }

       const msg = {
        to,
        from:'somosmas2022ong@gmail.com',
        subject,
        text,
        html,
       }

       try {
         await transport.sendMail(msg)
         await res.send('Email enviado')
       } catch (error) {
         res.send(error.message)
       }
    }
}

module.exports = mailerController