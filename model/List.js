const mongoose = require('mongoose')
const schema = mongoose.Schema
let todoParentList = new schema({
    createdBy: {
        type: String
    },
    listId: {
        type: String,
        unique: true,
        default: ''
    },
    listTitle: {
        type: String,
        default: '',
        uppercase: true,
        required: true
    },
    children: [], //item and child item will be stored here in children
    createdOn: {
        type: Date,
        default: ''
    }
})
module.exports = mongoose.model('NewList', todoParentList)