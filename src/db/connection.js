const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/metaAnalytics").then(() => {
    console.log('connected to db successfully');
}).catch((err) => {
    console.log('can not connect to db');
});