const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const adminValidator = require('../middlewares/isAdmin')

const JWT_SECRET = process.env.SECRET

//GET user data from token
router.get('/me', (req, res) => {
    //get token from header
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]
    const finalToken = token.replaceAll('"', '')

    //If no token, send error 404 (No found)
    if (!token) {
        return res.status(404).send('No token found')
    }

    //verify token, if valid send user data from it
    jwt.verify(finalToken, JWT_SECRET, (error, data) => {
        if (error) {
            return res.send(error)
         } else { 
            return res.send(data)
    }})
})


/*router.post('/test/login', (req, res) => {
    const user = {
        name: 'ignacio',
        email: 'ignacio@ignacio.com',
        roleId: 1 // roleId 1 es administrador, otro numero no lo serias y no funcionaria el validador
    }
    
    jwt.sign({user}, JWT_SECRET, (err, token) => {
       return res.json({token})
    })
})

router.post('/test/admin', adminValidator, (req, res) => {

    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    jwt.verify(token, JWT_SECRET, (error, data) => {
         return res.json({
           msg: "el token es valido y sos usuario administrador"
        })   
    })

})*/



module.exports = router
