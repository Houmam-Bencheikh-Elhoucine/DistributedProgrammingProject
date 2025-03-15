const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
    id_car: {type: mongoose.Schema.Types.ObjectId, ref: "Car"}, 
    id_client: {type: mongoose.Schema.Types.ObjectId, ref: "Client"},
    sdate: {type: Date, required: true, default: Date.now}, 
    edate: {type: Date, required: true} 
});

const Rent = mongoose.model('Rent', rentSchema);
module.exports = Rent;
