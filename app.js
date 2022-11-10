const express = require('express')
const psx= require('./psx')
const Thing = require('./models/Thing')
const mongoose = require('mongoose')
const app = express()
// mongoose.connect('mongodb+srv://gofullstack:<PASSWORD>@cluster0.z0lz7vb.mongodb.net/?retryWrites=true&w=majority',
mongoose.connect(psx,
  { useNewUrlParser: true,
    useUnifiedTopology: true})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))



// methode/middleware qu'intercepte toutes les requetes q'ont un content type json
// et mets le corps du contenu a dispo dans req.body
// equiovalent a l'ancien body-parser
app.use(express.json())

// middleware general, qui sera appliqué a toutes les routes, donc pas d'adresse en 1er param
// et a toutes les requetes
// on rajoute des headers a l'objet response
// cela permets a l'appli d'acceder a l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
});

app.post('/api/stuff', (req, res, next)=> {
    delete req.body._id //j'efface le champ id car il sera generé automatiquuement par la bdd
    const thing = new Thing({
        ...req.body
    })
    thing.save()
        .then(() => res.status(201).json({message: 'objet enregistré !'}))
        .catch(error => res.status(400).json({ error }))
})

app.put('/api/stuff/:id', (req, res, next)=> {
    Thing.updateOne({_id: req.params.id}, { ...req.body, _id: req.params.id})
    .then(res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }))
})

app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing)) //promise
    .catch(error => res.status(404).json({error}))
})

app.get('/api/stuff', (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things)) //promise
    .catch(error => res.status(400).json({error}))
})
// La base de données MongoDB est fractionnée en collections : le nom de la collection est défini par défaut sur le pluriel du nom du modèle. Ici, ce sera Things


module.exports = app;