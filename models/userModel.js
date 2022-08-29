const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    type: {
        type : String,
        enum: ["buyer", "seller"],
        default: "buyer",
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    phoneNumber :{
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true,
        minlength: 6
    },
}, { timestamps: true });

UserSchema.statics.findUser = async function(userName, password) {
    const user = await this.findOne({ userName });
  
    if(user) {
      if(user.status === "pending")
        throw new Error("Please activate your account or register again for the verification link");
      else {
        const auth = await bcrypt.compare(password, user.password);
        console.log("AUTH", auth)
        
        if(auth)
          return user;
        else 
          throw new Error("Invalid Password");
      }
    }
    else
      throw new Error("Invalid Username");
  }
  
  UserSchema.pre('save', async function(next) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
  
      next();
  })
  
  module.exports = mongoose.model("users", UserSchema);