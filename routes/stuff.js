const express = require('express')
const router = express.Router()
const stuffCtrl = require('../controllers/stuff')
// Ici dans le controller stuffCtrl j'ai deporté toute la logique des methodes du CRUD
// pour garder dans ce fichier seulement les routes avec l'appel a chaque methode

//'*** ROUTES ***//
router.post('/', stuffCtrl.createThing)
router.put('/:id', stuffCtrl.modifyThing)
router.delete('/:id', stuffCtrl.deleteThing)
router.get('/:id', stuffCtrl.getOneThing )
router.get('/', stuffCtrl.getAllThings)

module.exports = router