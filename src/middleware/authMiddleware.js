const jwt = require('jsonwebtoken');
const User = require('../db/models/user');

const protect = async(req,res,next) =>{
    let token;


    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split('Bearer ')[1];

            const decoded = jwt.verify(token,process.env.SECRET_KEY);
            req.user = await User.findById(decoded._id).select('-password');
            next();
        } catch (error) {
            res.status(401);
            res.send('Unauthorized');
        }
    }

    if(!token){
        res.status(401).send('No token found, unauthorized user');
    }
};

module.exports = {protect};