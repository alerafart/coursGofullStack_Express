const express = require('express')
const router = express.Router()
// const auth = require('auth')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const stuffCtrl = require('../controllers/stuff')



// Ici dans le controller stuffCtrl j'ai deporté toute la logique des methodes du CRUD
// pour garder dans ce fichier seulement les routes avec l'appel a chaque methode

//'*** ROUTES ***//
router.get('/', auth, stuffCtrl.getAllThings) // il faut appeler aut avant le gestionnaire des routes afin qu'il puisse être utilisée par la méthode
router.post('/', auth, multer, stuffCtrl.createThing)
router.put('/:id', auth, stuffCtrl.modifyThing)
router.delete('/:id',auth, stuffCtrl.deleteThing)
router.get('/:id', auth, stuffCtrl.getOneThing )


module.exports = router