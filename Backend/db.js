const mongoose = require('mongoose');
// mongoose.set('bufferCommands', false);
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo = () => {
    try {
        mongoose.connect(mongoURI, () => {
            console.log("Connected to Mongo Successfully");
        })
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = connectToMongo;