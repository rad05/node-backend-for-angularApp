
var mongoose = require('mongoose')
const stockSchema = new mongoose.Schema({
  stockName: { type: String, unique: true, required: true },
  stockPrice: { type: String, required: true },
  quantity: { type: String, required: true }
}, { timestamps: true });

const Stocks = mongoose.model("Stock", stockSchema)
console.log(Stocks)

exports.Stocks = Stocks;



