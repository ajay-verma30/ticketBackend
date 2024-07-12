const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const uri = `mongodb+srv://aryan2130:ahwm0mNuYS3KDVme@cluster0.ri4ol.mongodb.net/ticket?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverApi: ServerApiVersion.v1 
}).then(()=>{
    console.log("connected");
}).catch((e)=>{
    console.log('failed'+ e);
});