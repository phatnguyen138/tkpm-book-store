const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Error } = require('../helpers/error.helper');

module.exports = {
    dest: path.resolve(__dirname, '..', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.resolve(__dirname, '..', 'uploads');
            if (!fs.existsSync(uploadPath))
                cb(new Error(400, 'Not found directory'), false);
            else cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '_' + file.originalname);
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else cb(new Error(400, 'Invalid file type'), false);
    }
};
