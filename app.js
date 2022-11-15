const express = require('express')
const psx= require('./psx')
const path = require('path');
// import router
const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')

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

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes) // prefixe pour toutes les routes du stuffRoutes
app.use('/api/auth', userRoutes)

module.exports = app;