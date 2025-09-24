const mongoose = require('mongoose');


const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['food', 'drink'],
    required: true,
  },
  isPromo: {
    type: Boolean,
    default: false,
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  promoDesc: {
    type: String,
    default: '',
  },
  isBestMenu: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Menu', MenuSchema);
