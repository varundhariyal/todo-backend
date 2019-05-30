const mongoose = require('mongoose');
const schema = mongoose.Schema;
//new schema
let userSchema = new schema({
    userId: {
        type: String,
        unique: true
    },
    FirstName: {
        type: String,
        default: ''
    },
    LastName: {
        type: String,
        default: ''
    },
    Email: {
        type: String,
        default: ''
    },
    CountryCode: {
        type: String,
        default: ''
    },
    MobileNumber: {
        type: Number
    },
    Password:{
        type:String,
    },
    CreatedOn:{
        type:Date,
        default:''
    }
})
//export schema
module.exports = mongoose.model('Signup', userSchema);