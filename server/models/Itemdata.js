const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var NewItemSchema = new Schema({
    title: String,
    desc: String,
    quantity: String,
    type: String
   
});

var Itemdata = mongoose.model('itemdata',NewItemSchema);

module.exports = Itemdata;