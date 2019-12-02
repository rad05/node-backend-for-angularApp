const mongoose = require('mongoose');
var validator = require('validator');

mongoose.connect("mongodb://localhost:27017/training_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(response => {
    console.log("mongoose connected")
    const apple = new Stocks({ title: "xiaomi", price: 100 });
    apple.save().then(value => {
      console.log("SAVED", value)
    }, err => {
      console.log(err)
    })
  }, err => {
    console.log(err)
  })

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const stockSchema = new Schema({
  title: { type: String, required: true },
  price: {
    type: Number, default: 200, validate: {
      validator: (value) => {
        if (value < 200) {
          throw new Error("INCREASE STOCK PRICE PLEASE")
        }
      }
    }
  },
  email: {
    type: String, default: "test@mailinator.com", validate: (value) => {
      if (validator.isEmail(value)) {
        throw new Error("email format is incorrect")
      }
    }
  }

})

const Stocks = mongoose.model("Stocks", stockSchema)


//create a new stock
const stock = new Stock({ title: "redmi", price: 1000 });

stock.save(function (err) {
  if (!err) console.log('Success!');
});

//update stock