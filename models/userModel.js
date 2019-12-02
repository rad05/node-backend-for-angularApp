const mongoose = require('mongoose');
const validator = require('validator')
const Schema = mongoose.Schema;



const userSchema = new Schema({
  
  //email: { type: String },
  password: { type: String },
  
  
  // price: {
  //   type: Number, default: 200, validate: {
  //     validator: (value) => {
  //       if (value < 200) {
  //         throw new Error("INCREASE STOCK PRICE PLEASE")
  //       }
  //     }
  //   }
  // },
  
  email: {
    type: String, default: "test@mailinator.com",
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error("email format is incorrect")
      }
    }
  }

})

// userSchema.pre('save',()=>{

// })

const Users = mongoose.model("User", userSchema)
exports.Users = Users;
