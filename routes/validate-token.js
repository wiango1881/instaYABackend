const jwt = require('jsonwebtoken');

// middleware para validar token
const verificarToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({
            error: 'Acceso denegado'
        })
    }
    try {
        const verifica = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verifica
        next()
    } catch (error) {
        res.status(400).json({
            error: 'token no valido'
        })

    }

}

module.exports = verificarToken;