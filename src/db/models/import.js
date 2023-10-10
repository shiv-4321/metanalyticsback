const mongoose = require("mongoose");
const User = require("./user");

const importSchema = new mongoose.Schema({
    fname: {
        type: String,
        require: true,
        maxlength: 100
    },
    lname: {
        type: String,
        require: true,
        maxlength: 100
    },
    country_code: {
        type: Number,
        require: true,
        maxlength: 4
    },
    phone: {
        type: Number,
        require: true
    },
    tag: {
        type: String,
        require: true
    },
    user_id: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

const Importmodel = new mongoose.model("Imports", importSchema);
module.exports = Importmodel;