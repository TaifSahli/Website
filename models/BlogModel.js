const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bagSchema = new Schema({
  bagSize: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  item: { type: String, required: true },
  userId: { type: String, required: true },
}, 
{ timestamps: true }
);

const Bag = mongoose.model('Bag', bagSchema);

module.exports = Bag;
