const multer = require('multer')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

// Méthode diskStorage()  configure le chemin et le nom de fichier pour les fichiers entrants
const storage = multer.diskStorage({
    destination:(req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        //explique a multer quel nom de fichier utiliser
        const name = file.originalname.split(' ').join('_') // eliminer les espaces qui peuvent generer des erreurs coté serveur
        const extension = MIME_TYPES[file.mimetype] // multer n'a pas access a l'extension du fichier mais si a son mime_type, que nous repertorions donc dans un dictionnaire const MIME_TYPES
        callback(null, name + Date.now() + '.' + extension) // genere nom de fichier unique
    }
})

// méthode single()  crée un middleware qui capture les fichiers d'un certain type (passé en argument), et les enregistre au système de fichiers du serveur à l'aide du storage configuré.
module.exports = multer({ storage: storage }).single('image')