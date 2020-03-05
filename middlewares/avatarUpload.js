const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {        
        var datetimestamp = Date.now();
        var avatarname = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        req.body.avatar = avatarname;
        cb(null, avatarname);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback("Only files with the extension png, jpg, gif and jpeg are acceptable", false);
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
}).single('avatar');

module.exports = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            //A Multer error occurred when uploading.
            res.status(500);
            return res.send({
                status: false,
                message: err.message,
                data: {}
            })
        }
        else if (err) {
            res.status(400);
            return res.send({
                status: false,
                message: err,
                data: {}
            });
            // An unknown error occurred when uploading.
        }
    
        // Everything went fine.
        next(); 
    });     
};