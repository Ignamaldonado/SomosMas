const mercadoPago = require('mercadopago')

const credential = process.env.MP
let server = process.env.BASE_PATH_SERVER || 'http://localhost:3001'
const success = `${server}/checkout/success`
const error = `${server}/checkout/error`
const pending = `${server}/checkout/pending`

const mp = async(items, firstname, surname, email) => {
    try {
        mercadoPago.configure({
            access_token: credential
        })
        const config = {
            items,
            payer: {
                firstname,
                surname,
                email
            },
            back_urls:{
                success: success,
                failure: error,
                pending: pending
            },
            auto_return: "approved",
            notification_url: `${server}/checkout/notification`,
            /*shipments: {
                cost: shipping,
                mode: "not_specified"
            },*/
            
            statement_descriptor: "Donacion ONG"
        }        

        const preferences = await mercadoPago.preferences.create(config)
        return preferences
    } catch (error) {
       throw new Error(error)
    }
}

module.exports = mp
