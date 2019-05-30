const express = require('express');
const router = express.Router();
const listController = require('../controllers/singleTodo')
const appConfig = require("../config/appConfig")
const auth = require('../midlleware/auth')

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/singletodo`;

    app.post(`${baseUrl}/deleteitem/:listId/:itemId`, listController.deleteItem)
    app.post(`${baseUrl}/deletesubitem/:listId/:itemId/:subItemId`, listController.deletSubItem)
    app.post(`${baseUrl}/deleteList/:listId`, listController.deleteUserList)
    app.post(`${baseUrl}/create/:userId`, listController.createNewList)
    app.post(`${baseUrl}/additem/:listId`, listController.addItem)
    app.post(`${baseUrl}/addchilditem/:listId/:itemId`, listController.addchild)
    app.post(`${baseUrl}/edititem/:listId/:itemId`, listController.editItem)
    app.post(`${baseUrl}/editsubitem/:listId/:itemId/:subItemId`, listController.editSubItem)
    app.post(`${baseUrl}/isCompleted/:listId/:itemId`, listController.isCompleted)
    app.get(`${baseUrl}/getuserlist/:userId`, listController.fetchedList)
    app.get(`${baseUrl}/getsinglelist/:listId`, listController.findListWithListId)
    app.get(`${baseUrl}/getList`, listController.allList)

}