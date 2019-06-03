const express = require('express');
const router = express.Router();
const multiTodoController = require('../controllers/multiTodo')
const appConfig = require("../config/appConfig")
const auth = require('../midlleware/auth')

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/multitodo`;

    app.get(`${baseUrl}/getAllMultiTodo`, multiTodoController.getMultiTodo)
    /**
     * @apiGroup TODO Multi-User
     * @apiVersion  1.0.0
     * @api {get} /v1/multitodo/getAllMultiTodo api for getting all multi todos(friends & self only).
     *
     * @apiParam {string} userId unique id of the user. (query param) (required)
     * @apiParam {string} itemName name of todo item. (body param) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
{
    "error": false,
    "message": "Multi Todo fetched successfully",
    "status": 200,
    "data": [
        {
            "title": "edit 4",
            "isCompleted": false,
            "multiTodoId": "Rpf9UyAB_",
            "createdBy": "AXddtqYvp",
            "createdOn": "2019-05-30T12:54:12.000Z",
            "creatorData": {
                "_id": "5ce3f1a342838f120c797e26",
                "FirstName": "test1",
                "LastName": "2",
                "userId": "AXddtqYvp"
            }
        },
        {
            "title": "new",
            "isCompleted": false,
            "multiTodoId": "skM8k4b7K",
            "createdBy": "AXddtqYvp",
            "createdOn": "2019-05-31T06:56:19.000Z",
            "creatorData": {
                "_id": "5ce3f1a342838f120c797e26",
                "FirstName": "test1",
                "LastName": "2",
                "userId": "AXddtqYvp"
            }
        },
        {
            "title": "new 1",
            "isCompleted": false,
            "multiTodoId": "-Xc7ZIkef",
            "createdBy": "AXddtqYvp",
            "createdOn": "2019-05-31T09:02:01.000Z",
            "creatorData": {
                "_id": "5ce3f1a342838f120c797e26",
                "FirstName": "test1",
                "LastName": "2",
                "userId": "AXddtqYvp"
            }
        }
    ]
}
    */
    app.get(`${baseUrl}/getPreviousTransaction`, multiTodoController.getMultiToDoTransaction)
    /**
     * @apiGroup TODO Multi-User
     * @apiVersion  1.0.0
     * @api {get} /v1/multitodo/getAllMultiTodo api for getting all multi transactions(history).
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
     {
    "error": false,
    "message": "Multi Todo Transaction fetched successfully",
    "status": 200,
    "data": [
{
            "isCompleted": false,
            "changed": "title",
            "remarks": "test1 2 created a todo new 2",
            "transactionId": "lGnK5Y3nvA",
            "multiTodoId": "nMyHx1PS9",
            "title": "new 2",
            "createdOn": "2019-05-29T06:36:49.000Z",
            "createdBy": "AXddtqYvp",
            "editedBy": "undefined",
            "editorData": null
        },
        {
            "isCompleted": false,
            "changed": "title",
            "remarks": "test1 2 changed the title from new 2 to edited 2",
            "transactionId": "ZT6fy8p0W",
            "multiTodoId": "nMyHx1PS9",
            "title": "new 2",
            "createdOn": "2019-05-29T06:56:15.000Z",
            "createdBy": "AXddtqYvp",
            "editedBy": "AXddtqYvp",
            "editorData": {
                "_id": "5ce3f1a342838f120c797e26",
                "FirstName": "test1",
                "LastName": "2",
                "userId": "AXddtqYvp"
            }
        },
        {
            "isCompleted": false,
            "changed": "title",
            "remarks": "Varun Dhariyal changed the title from edited 2 to edit 23",
            "transactionId": "a7oFrxct7",
            "multiTodoId": "nMyHx1PS9",
            "title": "edited 2",
            "createdOn": "2019-05-29T07:04:24.000Z",
            "createdBy": "AXddtqYvp",
            "editedBy": "ydLN7X8CM",
            "editorData": {
                "_id": "5cda4cfe94c59303dfe114ff",
                "FirstName": "Varun",
                "LastName": "Dhariyal",
                "userId": "ydLN7X8CM"
            }
        },
        {
            "isCompleted": false,
            "changed": "title",
            "remarks": "Varun Dhariyal created a todo new",
            "transactionId": "OGvrlrHKOA",
            "multiTodoId": "gRcsmBFsJ",
            "title": "new",
            "createdOn": "2019-05-31T14:50:24.000Z",
            "createdBy": "ydLN7X8CM",
            "editedBy": "undefined",
            "editorData": null
        }
    ]
}
    */
    app.get(`${baseUrl}/getMultiTodoTrn/:multiTodoId`, multiTodoController.getMultiTodoTrn)
    /**
     * @apiGroup TODO Multi-User
     * @apiVersion  1.0.0
     * @api {get} /v1/multitodo/getMultiTodoTrn/:multiTodoId api for getting a multi todo's history.
     *
     * @apiParam {string} multiTodoId unique id of multi todo item. (route param) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
{
    "error": false,
    "message": "Multi Todo Transaction fetched successfully",
    "status": 200,
    "data": [
        {
            "isCompleted": false,
            "changed": "title",
            "remarks": "test1 2 created a todo new 2",
            "transactionId": "lGnK5Y3nvA",
            "multiTodoId": "nMyHx1PS9",
            "title": "new 2",
            "createdOn": "2019-05-29T06:36:49.000Z",
            "createdBy": "AXddtqYvp",
            "editedBy": "undefined",
            "editorData": null
        },
        {
            "isCompleted": false,
            "changed": "title",
            "remarks": "test1 2 changed the title from new 2 to edited 2",
            "transactionId": "ZT6fy8p0W",
            "multiTodoId": "nMyHx1PS9",
            "title": "new 2",
            "createdOn": "2019-05-29T06:56:15.000Z",
            "createdBy": "AXddtqYvp",
            "editedBy": "AXddtqYvp",
            "editorData": {
                "_id": "5ce3f1a342838f120c797e26",
                "FirstName": "test1",
                "LastName": "2",
                "userId": "AXddtqYvp"
            }
        },
        {
            "isCompleted": false,
            "changed": "title",
            "remarks": "Varun Dhariyal changed the title from edited 2 to edit 23",
            "transactionId": "a7oFrxct7",
            "multiTodoId": "nMyHx1PS9",
            "title": "edited 2",
            "createdOn": "2019-05-29T07:04:24.000Z",
            "createdBy": "AXddtqYvp",
            "editedBy": "ydLN7X8CM",
            "editorData": {
                "_id": "5cda4cfe94c59303dfe114ff",
                "FirstName": "Varun",
                "LastName": "Dhariyal",
                "userId": "ydLN7X8CM"
            }
        },
        {
            "isCompleted": false,
            "changed": "title",
            "remarks": "Varun Dhariyal changed the title from edit 23 to edited1",
            "transactionId": "Lj6R_ki33",
            "multiTodoId": "nMyHx1PS9",
            "title": "edit 23",
            "createdOn": "2019-05-29T07:16:42.000Z",
            "createdBy": "AXddtqYvp",
            "editedBy": "ydLN7X8CM",
            "editorData": {
                "_id": "5cda4cfe94c59303dfe114ff",
                "FirstName": "Varun",
                "LastName": "Dhariyal",
                "userId": "ydLN7X8CM"
            }
        },
        {
            "isCompleted": false,
            "changed": "title",
            "remarks": "test1 2 changed the title from edited1 to edit2",
            "transactionId": "QMV4xAsH2",
            "multiTodoId": "nMyHx1PS9",
            "title": "edited1",
            "createdOn": "2019-05-29T07:18:41.000Z",
            "createdBy": "AXddtqYvp",
            "editedBy": "AXddtqYvp",
            "editorData": {
                "_id": "5ce3f1a342838f120c797e26",
                "FirstName": "test1",
                "LastName": "2",
                "userId": "AXddtqYvp"
            }
        }
    ]
}
    */
    app.post(`${baseUrl}/addMultiTodo`, multiTodoController.addToDoItem)
    /**
     * @apiGroup TODO Multi-User
     * @apiVersion  1.0.0
     * @api {post} /v1/multitodo/addMultiTodo api for adding a multi todo item in multitodo-user list.
     *
     * @apiParam {string} title title of multi todo item. (body param) (required)
     * @apiParam {string} createdBy userId of user. (body param) (required)
     * @apiParam {string} remarks remarks field contains info about multi-todo item(creation). (body param) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
{
    "error": false,
    "message": "ToDoItem Created Successfully",
    "status": 200,
    "data": {
        "isCompleted": false,
        "changed": "title",
        "remarks": "Varun Dhariyal created a todo new multi-todo",
        "_id": "5cf4190957ab8b344b1365a9",
        "transactionId": "1qNBFtnlY",
        "multiTodoId": "QJx1oXjfd",
        "title": "new multi-todo ",
        "createdOn": "2019-06-02T18:44:25.000Z",
        "createdBy": "nMyHx1PS9",
        "__v": 0,
        "editorData": null,
        "id": "5cf4190957ab8b344b1365a9"
    }
}
    */
    app.post(`${baseUrl}/editMultiTodo`, multiTodoController.editMultiTodo)
    /**
     * @apiGroup TODO Multi-User
     * @apiVersion  1.0.0
     * @api {get} /v1/multitodo/editMultiTodo api for editing a multi todo item.
     *
     * @apiParam {string} multiTodoId unique id of multi todo item. (body param) (required)
     * @apiParam {string} title updated title of multi-todo item. (body param) (required)
     * @apiParam {string} editedBy userId of user. (body param) (required)
     * @apiParam {string} remarks remarks which has info about changes in multi-todo item. (body param) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
{
    "error": false,
    "message": "Data Updated successfully",
    "status": 200,
    "data": {
        "isCompleted": false,
        "changed": "title",
        "remarks": "test account changed the title from new multi-todo to newTitle",
        "_id": "5cf41c6857ab8b344b1365aa",
        "transactionId": "FxK-RzOUV",
        "multiTodoId": "QJx1oXjfd",
        "title": "new multi-todo ",
        "createdOn": "2019-06-02T18:58:48.000Z",
        "createdBy": "nMyHx1PS9",
        "editedBy": "GihHx921w",
        "__v": 0,
        "editorData": null,
        "id": "5cf41c6857ab8b344b1365aa"
    }
}
    */
    app.post(`${baseUrl}/undoHistory/:multiTodoId`, multiTodoController.undoHistory)
    /**
     * @apiGroup TODO Multi-User
     * @apiVersion  1.0.0
     * @api {get} /v1/multitodo/undoHistory/:multiTodoId api for undoing/reverting a multi todo's change.
     *
     * @apiParam {string} multiTodoId unique id of multi todo item. (route param) (required)
     * @apiParam {string} transactionId unique transaction id of multi-todo's transactions. (body param) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
{
    "error": false,
    "message": "Undo/Revert Successfully done",
    "status": 200,
    "data": [
        {
            "isCompleted": false,
            "changed": "title",
            "remarks": "test1 2 created a todo new 2",
            "transactionId": "lGnK5Y3nvA",
            "multiTodoId": "nMyHx1PS9",
            "title": "new 2",
            "createdOn": "2019-05-29T06:36:49.000Z",
            "createdBy": "AXddtqYvp",
            "editedBy": "undefined",
            "editorData": null
        },
        {
            "isCompleted": false,
            "changed": "title",
            "remarks": "test1 2 changed the title from new 2 to edited 2",
            "transactionId": "ZT6fy8p0W",
            "multiTodoId": "nMyHx1PS9",
            "title": "new 2",
            "createdOn": "2019-05-29T06:56:15.000Z",
            "createdBy": "AXddtqYvp",
            "editedBy": "AXddtqYvp",
            "editorData": {
                "_id": "5ce3f1a342838f120c797e26",
                "FirstName": "test1",
                "LastName": "2",
                "userId": "AXddtqYvp"
            }
        },
        {
            "isCompleted": false,
            "changed": "title",
            "remarks": "Varun Dhariyal changed the title from edited 2 to edit 23",
            "transactionId": "a7oFrxct7",
            "multiTodoId": "nMyHx1PS9",
            "title": "edited 2",
            "createdOn": "2019-05-29T07:04:24.000Z",
            "createdBy": "AXddtqYvp",
            "editedBy": "ydLN7X8CM",
            "editorData": {
                "_id": "5cda4cfe94c59303dfe114ff",
                "FirstName": "Varun",
                "LastName": "Dhariyal",
                "userId": "ydLN7X8CM"
            }
        },
        {
            "isCompleted": false,
            "changed": "title",
            "remarks": "Varun Dhariyal changed the title from edit 23 to edited1",
            "transactionId": "Lj6R_ki33",
            "multiTodoId": "nMyHx1PS9",
            "title": "edit 23",
            "createdOn": "2019-05-29T07:16:42.000Z",
            "createdBy": "AXddtqYvp",
            "editedBy": "ydLN7X8CM",
            "editorData": {
                "_id": "5cda4cfe94c59303dfe114ff",
                "FirstName": "Varun",
                "LastName": "Dhariyal",
                "userId": "ydLN7X8CM"
            }
        }
    ]
}
    */
    app.post(`${baseUrl}/deleteMultitodo`, multiTodoController.deleteMultiTodo)
    /**
     * @apiGroup TODO Multi-User
     * @apiVersion  1.0.0
     * @api {post} /v1/multitodo/deleteMultiTodo api for deleting a multi todo.
     *
     * @apiParam {string} multiTodoId unique id of multi todo item. (body param) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
{
    "error": false,
    "message": "Multi Todo Deleted Successfully",
    "status": 200
}
    */
}