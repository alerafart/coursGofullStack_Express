const express = require('express')
const psx= require('./psx')
// const secret = psx
const mongoose = require('mongoose')
const app = express()
// mongoose.connect('mongodb+srv://gofullstack:<PASSWORD>@cluster0.z0lz7vb.mongodb.net/?retryWrites=true&w=majority',
mongoose.connect(psx,
  { useNewUrlParser: true,
    useUnifiedTopology: true
    })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



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
    console.log(req.body)
    res.status(201).json({
        message: 'Objet crée!'
    })

})

app.get('/api/stuff', (req, res, next) => {
    const stuff = [
        {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
        },
        {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
        },
    ]
    res.status(200).json(stuff)
})

module.exports = app;