import express from 'express'
import multer from 'multer'
import path from 'path'
const router = express.Router()

//intialiser variable for multer storage 
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}${path.extname(file.originalname)}}`)
    }
})

//checks the type of file
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    //the above syntax is a regular expression passed to variable filetypes
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images Only!')
    }
}

//to upload via multer
const upload = multer({
    storage,

    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
    //file filter property allow us to upload anytype of file at all
    // in this case we aim to upload just image so we create a function called checkFileType
    //to check that it only image that is been uploaded to the file or folder destination 

})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

//upload.single passed in as middleware

export default router