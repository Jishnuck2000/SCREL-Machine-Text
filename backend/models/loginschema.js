const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const loginschema = new Schema({
//   email_id: String,
  username:String,
  password: String,
  role: Number,
});

var Logindata = mongoose.model('login_tb', loginschema); 
module.exports = Logindata;