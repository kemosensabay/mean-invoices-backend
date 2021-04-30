const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const clientSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
});

clientSchema.plugin(uniqueValidator); //Validate unique email before saving data

module.exports = mongoose.model("Client", clientSchema);
