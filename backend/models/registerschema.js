const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const registerschema = new Schema({
  login_id: { type: Schema.Types.ObjectId, ref: 'login_tb', required: true },
  email_id: { type: String, required: true },
  phone_no: { type: Number, required: true },


});

var Registerdata = mongoose.model('register_tb', registerschema); 
module.exports = Registerdata;