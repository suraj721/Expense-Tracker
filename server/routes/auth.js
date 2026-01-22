const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// @desc    Get current user (and sync if needed)
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
    try {
        if (req.user) {
            // User exists in DB
            res.status(200).json({ success: true, data: req.user });
        } else if (req.firebaseUser) {
            // User authenticated with Firebase but not in MongoDB
            // Create new user
            const newUser = await User.create({
                name: req.firebaseUser.name || req.firebaseUser.email.split('@')[0], // Fallback name
                email: req.firebaseUser.email,
                password: 'firebase-auth-user', // Dummy password
                photo: req.firebaseUser.picture || 'no-photo.jpg'
            });
            res.status(200).json({ success: true, data: newUser });
        } else {
            res.status(401).json({ success: false, error: 'Not authorized' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// @desc    Sync user data (specifically for registration with name)
// @route   POST /api/auth/sync
// @access  Private
router.post('/sync', protect, async (req, res) => {
    try {
        const { name } = req.body;

        let user = await User.findOne({ email: req.firebaseUser.email });

        if (user) {
            // Update existing user
            user.name = name || user.name;
            await user.save();
        } else {
            // Create new user
            user = await User.create({
                name: name || req.firebaseUser.email.split('@')[0],
                email: req.firebaseUser.email,
                password: 'firebase-auth-user',
                photo: req.firebaseUser.picture || 'no-photo.jpg'
            });
        }

        res.status(200).json({ success: true, data: user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('photo');

// Check file type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
router.put('/updatedetails', protect, (req, res) => {
    console.log("Update details request received");
    upload(req, res, async (err) => {
        if (err) {
            console.error("Multer error:", err);
            return res.status(400).json({ success: false, error: err });
        } else {
            console.log("File uploaded:", req.file);
            console.log("Body:", req.body);
            try {
                const fieldsToUpdate = {
                    name: req.body.name,
                    // email: req.body.email // Disable email update for now as it requires firebase sync
                };

                if (req.file) {
                    fieldsToUpdate.photo = `uploads/${req.file.filename}`;
                }

                const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
                    new: true,
                    runValidators: true
                });

                res.status(200).json({
                    success: true,
                    data: user
                });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    });
});

module.exports = router;
