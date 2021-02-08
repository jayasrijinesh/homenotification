const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var NewTaskSchema = new Schema({
    title: String,
    desc: String,
    due: Date
   
});

var Taskdata = mongoose.model('taskdata',NewTaskSchema);

module.exports = Taskdata;