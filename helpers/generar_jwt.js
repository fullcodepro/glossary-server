const jwt = require('jsonwebtoken');

const generar_jwt = (uid) => {
    
    return new Promise((resolve, reject) => {
        payload = { uid }
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, { expiresIn: '5h' },
            (error, token) => {
                if (error) {
                    console.log(error)
                    reject('Error al generar token - generar_jwt')
                }

                resolve(token)
            }
        )
    });
};

module.exports = {
    generar_jwt
}