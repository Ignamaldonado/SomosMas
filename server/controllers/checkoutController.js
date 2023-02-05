const mp = require('../services/mercadoPago')
const BASE_PATH_CLIENT = process.env.BASE_PATH_CLIENT

const controller = {
    process: async (req,res) => {

            const { donation, currency, firstname, surname, email } = req.body
            const item = [{
                title: 'Donacion ONG SOMOS MAS',
                description:'Muchas gracias por donar para la organizacion somos mas',
                quantity: 1,
                currency_id: currency,
                unit_price: parseInt(donation)
            }]

            let link = await mp(item, firstname, surname, email)
            console.log(link)
            link = link.body.init_point
            res.send(link) 

    },

    sucess: async (req, res) => {
        const {payment_id, preference_id, status} = req.query
        res.redirect(`${BASE_PATH_CLIENT}/donation/sucess/?payment_id=${payment_id}&status=${status}&orderId=${preference_id}`)
    },

    pending: async (req, res) => {
        const {payment_id, preference_id, status} = req.query 
        return res.redirect(`${BASE_PATH_CLIENT}/donation/pending/?payment_id=${payment_id}&status=${status}&orderId=${preference_id}`)
    },

    cancelled: async (req, res) => {
        return res.redirect(`${BASE_PATH_CLIENT}/donation/error`)
    },
    
    notification: async (req, res) => {
        // aca tendriamos que guardar el status, el numero pago y la persona que realizo en la db segun el objeto que te devuelve mercadopago si es un success
        res.status(200).send('OK')
    }

}

module.exports = controller