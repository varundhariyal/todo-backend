const mongoose = require('mongoose')
const schema = mongoose.Schema
const friendRequest = new schema({
    senderId: {
        type: String
    },
    receiverId: {
        type: String
    }
});

module.exports = mongoose.model('FriendList', friendRequest)