const mongoose = require('mongoose')
const schema = mongoose.Schema
const friendRequest = new schema({
    senderId: {
        type: String
    },
    receiverId: {
        type: String
    },
    sentOn: {
        type: Date,
        default: ''
    },
    status: {
        type: String,
        default: 'pending'
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

//for fetching userid from signup model,using virtuals of mongoose
friendRequest.virtual('senderData', {
    ref: 'Signup',
    localField: 'senderId',
    foreignField: 'userId',
    justOne: true
});
//for fetching userid from signup model,using virtuals of mongoose
friendRequest.virtual('receiverData', {
    ref: 'Signup',
    localField: 'receiverId',
    foreignField: 'userId',
    justOne: true
});

module.exports = mongoose.model('Friend', friendRequest)