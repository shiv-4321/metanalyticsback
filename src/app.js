const express = require('express');
const app = express();
const PORT = process.env.PORT|| 4000;
require('dotenv').config();
require('./db/connection');
const userRoutes = require('./routes/api/user');
const jwt = require('jsonwebtoken');
app.use(express.json());
var cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTA4NzkzNTQ4MTc1YWEyYzMxYmQyMmUiLCJpYXQiOjE2OTUwNTQyMDd9.6GRWX-_-AbmBeU3cSwWdr7Fn0E6mnp_6CR9zv7ZwAtI';
        const jwt_token = jwt.verify(token, process.env.SECRET_KEY);
        res.status(201).send(jwt_token);
    } catch (error) {
        res.status(500).send(error);
    }

})

app.use('/user', userRoutes);


app.listen(PORT, (req, res) => {
    console.log(`App is running on Port ${PORT}`)
});