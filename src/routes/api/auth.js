const express = require('express');
const authRoutes = express.Router();

// authRoutes.use((req,res,next) => {
//     next();
// });

authRoutes.post('/', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});


const getMe = (req, res) => {
    const { _id, email,fname,phone } = req.user;
    return res.json({
        id: _id,
        email,
        fname,
        phone
    });
}

module.exports = { authRoutes, getMe };