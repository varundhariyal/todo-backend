const mongoose = require('mongoose')
const schema = mongoose.Schema
const multiTodo = new schema({
    multiTodoId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: String
    },
    createdOn: {
        type: Date
    },
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})
//for supplying value to multiTodo schema from user DB using mongoose virtuals
multiTodo.virtual('creatorData', {
    ref: 'Signup',
    localField: 'createdBy',
    foreignField: 'userId',
    justOne: true
})
module.exports = mongoose.model('Multitodo', multiTodo)