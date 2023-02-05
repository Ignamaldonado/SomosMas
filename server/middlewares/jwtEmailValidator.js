const jwt = require('jsonwebtoken')
const JWT_EMAIL_SECRET = process.env.EMAIL_SECRET

module.exports = async (req,res,next) =>{

    let bearerHeader =  req.headers.authorization;
    if(typeof bearerHeader === 'undefined'){
        return res.status(400).json({errors:[{msg:"No encontramos un token"}]})
    }

    let bearerToken = bearerHeader.split(" ")[1];
    if (!bearerToken) {
        return res.status(400).json({errors:[{msg:"No encontramos un token"}]})
    }    

    const finalToken = bearerToken.replaceAll('"', '')

    jwt.verify(finalToken, JWT_EMAIL_SECRET, (error, authData) => {
        if(error){
            return res.status(400).json({errors:[{msg:"El token es invalido"}]})
        }else{
            delete(authData.payload.password)
            req.userData = authData.payload
            next();
        }
    });
    
}