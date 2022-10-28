const mongoose = require('mongoose');
const { Schema } = mongoose;

const noodleSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  username: {type: String, required: true},
  room: {
    type: String,
    required: true
  },
  __createdtime__: {type: Date},
    
}, { timestamps: true })


const Noodle = mongoose.model('noodle', noodleSchema);
module.exports = Noodle;