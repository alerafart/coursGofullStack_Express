const multer = require('multer')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination:(req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        //explique a multer quel nom de fichier utiliser
        const name = file.originalname.split(' ').join('_') // eliminer les espaces qui peuvent generer des erreurs coté serveur
        const extension = MIME_TYPES[file.mimetype]
        callback('null', name + Date.now() + '.' + extension) // genere nom de fichier unique
    }
})

module.exports = multer({ storage }).single('image')