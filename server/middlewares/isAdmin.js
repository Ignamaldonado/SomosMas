const jwt = require ('jsonwebtoken')

function isAdmin(req,res,next){
    const secret = process.env.SECRET
    let bearerToken;
    const bearerHeader = req.headers['authorization'] 
    console.log(bearerHeader)
    if(typeof bearerHeader !== 'undefined') {
        bearerToken = bearerHeader?.split(' ')[1]
    } else {
        return res.sendStatus(401)
    } // Si no manda authorization en headers da 401

    if (!bearerToken) {
        return res.sendStatus(404)
    } // si no existe el token da 404

    jwt.verify(bearerToken, secret, (error, data) => {
        if (error) {
            console.log(error)
            return res.status(401).send(error)
        } else {
            const admin = data.payload.roleId // variable a modificar cuando este el merge de como es el token
            if(admin === 1) {
                next()
            } else {
                return res.sendStatus(401) // si tu roleId no es 1 (osea administrador) da 403
            }
        }// si el token es invalido da el resultado de error
    })
}

module.exports = isAdmin