const Thing = require('../models/Thing')

// La base de données MongoDB est fractionnée en collections
// le nom de la collection est défini par défaut sur le pluriel du nom du modèle
// Ici, ce sera Things...

// methode pour retrouver tous les objets
exports.getAllThings = (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things)) //promise
    .catch(error => res.status(400).json({ error }))
}

// methode pour retrouver un objet par id
exports.getOneThing =(req, res, next) => {
    Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing)) //promise
    .catch(error => res.status(404).json({ error }))
}

// methode pour créer un objet
exports.createThing = (req, res, next)=> {
    delete req.body._id //j'efface le champ id car il sera generé automatiquuement par la bdd
    const thing = new Thing({
    // title: req.body.title,
    // description: req.body.description,
    // imageUrl: req.body.imageUrl,
    // price: req.body.price,
    // userId: req.body.userId
    ...req.body // identique aux 5 lignes precedentes
    })
    thing.save()
        .then(() => res.status(201).json({message: 'objet enregistré !'}))
        .catch(error => res.status(400).json({ error }))
}

// methode pour modifier un objet
exports.modifyThing = (req, res, next)=> {
    Thing.updateOne({_id: req.params.id}, { ...req.body, _id: req.params.id})
    .then(res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }))
}

// methode pour suprimer un objet
exports.deleteThing = (req, res, next)=> {
    Thing.deleteOne({_id: req.params.id}, { ...req.body, _id: req.params.id})
    .then(res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }))
}



