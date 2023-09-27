const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});



userSchema.methods.comparePassword = async function (password) {
    try {
        const match = await bcrypt.compare(password, this.password);
        return match;

    } catch (error) {
        console.log(error);
        return false;
    }
}


userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY,{
            expiresIn:'1d'
        });
        this.token = token;
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }

};

const User = new mongoose.model("Users", userSchema);
module.exports = User;
