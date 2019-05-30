const mongoose = require('mongoose')
const schema = mongoose.Schema
const multiTodoTransaction = new schema({
    transactionId: {
        type: String,
        required: true
    },
    multiTodoId: {
        type: String
    },
    title: {
        type: String,
    },
    isCompleted: {
        default: false,
        type: Boolean
    },
    changed: {
        type: String,
        default: ''
    },
    createdOn: {
        type: Date
    },
    createdBy: {
        type: String
    },
    editedBy: {
        type: String
    },
    remarks: {
        type: String,
        default: ''
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})
multiTodoTransaction.virtual('editorData', {
    ref: 'Signup',
    localField: 'editedBy',
    foreignField: 'userId',
    justOne: true
})
module.exports = mongoose.model('MultitodoTransaction', multiTodoTransaction)