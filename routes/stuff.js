const express = require('express')
const router = express.Router()
const Thing = require('../models/Thing')

// La base de données MongoDB est fractionnée en collections : le nom de la collection est défini par défaut sur le pluriel du nom du modèle. Ici, ce sera Things

// methode pour créer un objet
router.post('/', (req, res, next)=> {
    delete req.body._id //j'efface le champ id car il sera generé automatiquuement par la bdd
    const thing = new Thing({
    title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    })
    thing.save()
        .then(() => res.status(201).json({message: 'objet enregistré !'}))
        .catch(error => res.status(400).json({ error }))
})

// methode pour modifier un objet
router.put('/:id', (req, res, next)=> {
    Thing.updateOne({_id: req.params.id}, { ...req.body, _id: req.params.id})
    .then(res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }))
})

// methode pour suprimer un objet
router.delete('/:id', (req, res, next)=> {
    Thing.deleteOne({_id: req.params.id}, { ...req.body, _id: req.params.id})
    .then(res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }))
})

// methode pour retrouver un objet par id
router.get('/:id', (req, res, next) => {
    Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing)) //promise
    .catch(error => res.status(404).json({error}))
})

// methode pour retrouver tous les objets
router.get('/', (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things)) //promise
    .catch(error => res.status(400).json({error}))
})

module.exports = router