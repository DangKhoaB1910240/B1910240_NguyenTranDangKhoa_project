const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  id_user: {
    type: ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  addr: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  purchase_date: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Bills", categorySchema);
