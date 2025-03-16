const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    lname: {type: String}, 
    fname: {type: String}, 
    bdate: {type: Date}, 
    telephone: {type: String, required: true}, 
    national_id: {type: String, required: true, unique: true}
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
