const mongoose = require("mongoose");

const entriesSchema = new mongoose.Schema({
    title: {
        type: String, 
        //required: true, 
        unique: false
    },
    date: {
        type: String, 
       // required: true, 
        unique: false
    },
    description: String,
    photo: String,
    latitude: Number,
    longitude: Number,   
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    public: String
})

const Entries = mongoose.model('Entries', entriesSchema);

module.exports = Entries;