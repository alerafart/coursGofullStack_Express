const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    //en 1er hacher le mdp
    console.log(bcrypt.hash(req.body.password, 10))
    bcrypt.hash(req.body.password, 10) //2eme param sont les tours de hachage, plus c'est grand plus c'est long a executer
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password:hash
        })
        console.log(user)
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
        .catch(error => res.status(400).json({ error, message: 'catch afther save user then' }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (!user) {
            res.status(401).json({message: 'Paire identifiant mdp incorrect'})
            //cas si l utilisateur n'existe pas
        }  else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    res.status(401).json({ message: 'Paire identifiant mdp incorrect'})
                    // cas ou l'utilisateur existe mais le mdp est incorrect
                } 
                // cas ou l'utilisateur existe ET le mdp est incorrect
                else {
                    res.status(200).json({ 
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id}, //1er argument o payload ici le id du user
                            'RANDOM_TOKEN_SECRET', //2em argument cle secrete pour l encodage, tres simple dans cet exemple
                            {expiresIn: '24h'} // 3eme argument config
                        )
                    })
                }
            })
            .catch(error => {
                res.status(500).json({ error }) //je tombe sur cette erreur
            })
        }
    })
    .catch(error => {
        res.status(500).json( { error } )
    })
}