const Thing = require('../models/Thing')
const fs = require('fs')
// La base de données MongoDB est fractionnée en collections
// le nom de la collection est défini par défaut sur le pluriel du nom du modèle
// Ici, ce sera Things...

// methode pour retrouver tous les objets
exports.getAllThings = (req, res, next) => {
    Thing.find()
    // console.log(req.headers.authorization)
    .then(things => res.status(200).json(things)) //promise
    // .catch(error => res.status(400).json(console.log(req.headers.authorization) ))
    .catch(error => res.status(400).json({ error } ))
}

// methode pour retrouver un objet par id
exports.getOneThing =(req, res, next) => {
    Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing)) //promise
    .catch(error => res.status(404).json({ error }))
}

// methode pour créer un objet AVEC multer 
exports.createThing = (req, res, next)=> {
    //1 parser objet requete 
    const thingObject = JSON.parse(req.body.thing)
    delete thingObject._id
    delete thingObject._userId // s'assurer avec le userID qui viens de token pour s'assurer que c'est bien la personne qui a crée l'objet
    const thing  = new Thing({
        ...thingObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    thing.save()
    .then(()=> { res.status(201).json({ message:'Objet enregistré !'})})
    .catch(error => { res.status(400).json({ error })})
}

// methode pour modifier un objet AVEC MULTER et gestion de fichier image
exports.modifyThing = (req, res, next)=> {
    // selon s'il y a fichier transmis ou pas le format de requete est different. quand il y a fichier transmis on reçois une string/ nous recevrons l'élément form-data et le fichier; sinon uniquement un objet json.
    //Ce ternaire verifie si il y a un file transmise ou pas, si oui il fais un parse, sinon juste un req.body
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body}

    delete thingObject._userId
    Thing.findOne({_id: req.params.id})
    .then((thing) => {
        if(thing.userId != req.auth.userId) {
            res.status(401).json({ message: 'Non autorisé'})
        } else {
            Thing.updateOne({ _id: req.params.id}, {...thingObject, _id: req.params.id})
            .then(()=> res.status(200).json({message: 'Objet modifié!'}))
            .catch(error => res.status(401).json({ error }))
            
        }
    })
}

// methode pour suprimer un objet
exports.deleteThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
    .then(thing => {
        if(thing.userId != req.auth.userId) {
            res.status(401).json({message: 'Not-authorized'})
        } else {
            const filename = thing.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                Thing.deleteOne({_id: req.params.id})
                .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                .catch(error => res.status(401).json({ error }))
            })
        }
    })
    .catch(error => res.status(400).json({ error }))
}



