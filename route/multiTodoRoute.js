const express = require('express');
const router = express.Router();
const multiTodoController = require('../controllers/multiTodo')
const appConfig = require("../config/appConfig")
const auth = require('../midlleware/auth')

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/multitodo`;

    app.get(`${baseUrl}/getAllMultiTodo`, multiTodoController.getMultiTodo)
    app.get(`${baseUrl}/getPreviousTransaction`, multiTodoController.getMultiToDoTransaction)
    app.get(`${baseUrl}/getMultiTodoTrn/:multiTodoId`, multiTodoController.getMultiTodoTrn)

    app.post(`${baseUrl}/addMultiTodo`, multiTodoController.addToDoItem)
    app.post(`${baseUrl}/editMultiTodo`, multiTodoController.editMultiTodo)
    app.post(`${baseUrl}/undoHistory/:multiTodoId`, multiTodoController.undoHistory)
}