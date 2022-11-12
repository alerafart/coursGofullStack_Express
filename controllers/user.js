const bcrypt = require('bcrypt')
const User = require('../models/User')

exports.signup = (req, res, next) => {
    //en 1er hacher le mdp
    bcrypt.hash(req.body.password, 10) //2eme param sont les tours de hachage, plus c'est grand plus c'est long a executer
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password:hash
        })
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    
}