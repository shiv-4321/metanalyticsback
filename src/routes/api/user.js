const express = require('express');
const router = express.Router();
const User = require('./../../db/models/user');
const bcrypt = require('bcryptjs');
const { getMe } = require('./auth');
const { protect } = require('../../middleware/authMiddleware');
const Importmodel = require('../../db/models/import');
const url = require('url');

const getImports = async (req, res) => {
    const importedData = await Importmodel.find();
    res.status(201).send({ status: true, data: importedData });
};


router.post('/signup', async (req, res) => {

    try {
        const { fname, email, phone, password } = req.body;
        const isUserexists = await User.findOne({ email });
        if (isUserexists) {
            res.status(201).send({ message: "User with this email already exists." });
            return;
        }

        const genSalt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password.toString(), genSalt);
        const formData = { fname, email, phone, password: hashedPass };
        const signupUser = new User(formData);
        const registered = await signupUser.save();
        res.status(201).send({ message: "User Created Successfully", data: registered });
    } catch (error) {
        res.status(400).send(error);
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });
        if (!userData) {
            res.status(201).send({ message: "User with this email does not exist." });
            return;
        }

        const matchPass = await userData.comparePassword(password.toString());
        console.log(matchPass);
        if (!matchPass) {
            res.status(201).send({ message: "Incorrect Password." });
            return;
        }

        const token = await userData.generateAuthToken();

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 50000),
            httpOnly: true
        });

        res.status(201).send({ message: 'Loggedin Successfully', token });
    } catch (error) {
        res.status(404).send(error);
    }


});

router.get('/me', protect, getMe)

router.post('/import', protect, async (req, res) => {
    const formData = req.body;
    const importData = formData.map(val => { return { ...val, user_id: req.user._id.toString() } })
    const importedRec = await Importmodel.insertMany(importData);
    res.status(201).send({ message: 'Records Imported Successfully', data: importedRec });
});

router.get('/import', protect, getImports);

module.exports = router;