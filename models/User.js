const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  cc: { type: Number, required: true, unique: true },
  country: { type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile: { type: String, default: "default-picture.png" },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  
  organizations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }] 
});

const User = mongoose.model('User', userSchema);

module.exports = User;