const db = require("../models");
const { validationResult } = require("express-validator");
const ejs = require('ejs')
const sendMail = require('../services/sendMail')
const path = require('path');

const contactsControllers = {
    add: async (req, res) => {
    //Check if there is any error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Else Save in db
    const { name, phone, email, message } = req.body;
    const entryObj = {
        name,
        phone,
        email,
        message,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const newEntry = await (new db.contacts(entryObj).save()); 
        if(newEntry != null){ 
            //email to the ONG notifying that someone wants to contact.
            ejs.renderFile(path.resolve(__dirname, '../views/newContact.ejs'), {newEntry}, (err, newContactHTML) => {
                if (err) {
                    console.log(err);
                } else { 
                    sendMail('somosmas2022ong@gmail.com', 'Hola. Somos Mas', undefined, newContactHTML)
                }           
            }),     
            
            // email to the person notifying that their information was sent and saved in the ONG. 
            ejs.renderFile(path.resolve(__dirname, '../views/welcomeNewContact.ejs'), {newEntry}, (err, welcomeHTML) => {
                if (err) {
                    console.log(err);
                } else { 
                    sendMail(newEntry.email, 'Contacto ¡Somos Mas!', undefined, welcomeHTML)
                }    
            })
        }
        return res.json(newEntry);
    },
    respond: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        ejs.renderFile(path.resolve(__dirname, '../views/responseContact.ejs'), {response: req.body}, async (err, responseContact) => {
            if (err) {
                res.sendStatus(400)
            } else { 
                await sendMail(req.body.email, req.body.subject, undefined, responseContact)
                res.sendStatus(200)
            }    
        })

    },
    getAll: async (req, res) => {
        const contacts = await db.contacts.findAll()
        res.json(contacts)
    },

};


module.exports = contactsControllers;
