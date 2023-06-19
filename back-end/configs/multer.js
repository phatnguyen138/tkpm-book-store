const multer = require('multer');
const path = require('path');

module.exports = {
    dest: path.resolve(__dirname, '..', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(
                new Error('Not found directory'),
                path.resolve(__dirname, '..', 'uploads')
            );
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname) + '_' + Date.now();
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    }
};
