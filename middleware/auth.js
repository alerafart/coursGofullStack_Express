const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token =  req.headers.authorization.split(' ')[1]
        console.log(token)
        // recupere le header et le splite. Il divise cette chaine de caracteres au tour de le espace et recuperer la 2eme index du tableau apres bearer, le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET') // methode verify sers a decoder le token
        const userId = decodedToken.userId
        // on transmets ce userId a l'objet request q est transmis aux routes qui seront appelles par la suite
        req.auth = {
            userId: userId
        }
    } catch(error) {
        res.status(401).json({ error })
    }
}