const express = require('express');
const router = express.Router();
const listController = require('../controllers/singleTodo')
const appConfig = require("../config/appConfig")
const auth = require('../midlleware/auth')

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/singletodo`;
    app.post(`${baseUrl}/create/:userId`, listController.createNewList)
    /**
     * @apiGroup TODO Single-User
     * @apiVersion  1.0.0
     * @api {post} /v1/singletodo/create/:userId api for creating an empty single todo list.
     *
     * @apiParam {string} createdBy user id of the user. (route param) (required)
     * @apiParam {string} listTitle title of the todo list. (body param) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
        {
   "error":false,
   "message":"New To-Do list created success",
   "status":200,
   "data":{
      "listId":"t8iriG-ti",
      "listTitle":"TEST SINGLE-USER TODO LIST",
      "children":[],
      "createdOn":"2019-06-02T12:35:00.000Z",
      "_id":"5cf3c274c69b450e894a2314",
      "createdBy":"1",
      "__v":0
   }
}
    */
    app.post(`${baseUrl}/additem/:listId`, listController.addItem)
    /**
     * @apiGroup TODO Single-User
     * @apiVersion  1.0.0
     * @api {post} /v1/singletodo/additem/:listId api for adding an todo item to single todo list.
     *
     * @apiParam {string} listId unique id of the todo list. (route param) (required)
     * @apiParam {string} itemName name of todo item. (body param) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
    {
   "error":false,
   "message":"ToDo item added to list successfully",
   "status":200,
   "data":{
      "listId":"t8iriG-ti",
      "listTitle":"TEST SINGLE-USER TODO LIST",
      "children":[
         {
            "itemName":"test item single-user todo",
            "itemId":"ePSSBWfKK",
            "createdOn":"2019-06-02T12:46:16Z",
            "children":[],
            "isCompleted":false
         }
      ],
      "createdOn":"2019-06-02T12:35:00.000Z",
      "_id":"5cf3c274c69b450e894a2314",
      "createdBy":"1",
      "__v":1
   }
}
    */
    app.post(`${baseUrl}/addchilditem/:listId/:itemId`, listController.addchild)
    /**
     * @apiGroup TODO Single-User
     * @apiVersion  1.0.0
     * @api {post} /v1/singletodo/addchilditem/:listId/:itemid api for adding a sub todo item to single todo list.
     *
     * @apiParam {string} listId unique id of the todo list. (route param) (required)
     * @apiParam {string} itemId unique id of the todo list's item. (route param) (required)
     * @apiParam {string} subItemName name of sub todo item. (body param) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
     {
    "error": false,
    "message": "ToDo sub/child item added to list successfully",
    "status": 200,
    "data": {
        "listId": "t8iriG-ti",
        "listTitle": "TEST SINGLE-USER TODO LIST",
        "children": [
            {
                "itemName": "test item single-user todo",
                "itemId": "ePSSBWfKK",
                "createdOn": "2019-06-02T12:46:16Z",
                "children": [
                    {
                        "subItemName": "test sub item",
                        "subItemId": "BuBx9u3Z7",
                        "createdOn": "2019-06-02T13:01:21Z",
                        "isCompleted": false
                    }
                ],
                "createdBy": null,
                "isCompleted": false
            }
        ],
        "createdOn": "2019-06-02T12:35:00.000Z",
        "_id": "5cf3c274c69b450e894a2314",
        "createdBy": "1",
        "__v": 2
    }
}
    */
    app.post(`${baseUrl}/edititem/:listId/:itemId`, listController.editItem)
    /**
     * @apiGroup TODO Single-User
     * @apiVersion  1.0.0
     * @api {post} /v1/singletodo/edititem/:listId/:itemid api for editing a todo item in a todo list.
     *
     * @apiParam {string} listId unique id of the todo list. (route param) (required)
     * @apiParam {string} itemId unique id of the todo list's item. (route param) (required)
     * @apiParam {string} itemName name of sub todo item. (body param) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
     {
    "error": false,
    "message": "Item Updated Successfully in List",
    "status": 200,
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
     */
    app.post(`${baseUrl}/deleteList/:listId`, listController.deleteUserList)
    /**
     * @apiGroup TODO Single-User
     * @apiVersion  1.0.0
     * @api {post} /v1/singletodo/deleteList/:listId api for deleting a todo list.
     *
     * @apiParam {string} listId unique id of the todo list. (route param) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
     {
    "error": false,
    "message": "todo list deleted succesfully",
    "status": 200,
    "data": {
        "listId": "t8iriG-ti",
        "listTitle": "TEST SINGLE-USER TODO LIST",
        "children": [],
        "createdOn": "2019-06-02T12:35:00.000Z",
        "_id": "5cf3c274c69b450e894a2314",
        "createdBy": "1",
        "__v": 2
    }
}
     */
    app.post(`${baseUrl}/deleteitem/:listId/:itemId`, listController.deleteItem)
    /**
     * @apiGroup TODO Single-User
     * @apiVersion  1.0.0
     * @api {post} /v1/singletodo/deleteitem/:listId/:itemId api for deleting a todo item of todo list.
     *
     * @apiParam {string} listId unique id of the todo list. (route param) (required)
     * @apiParam {string} itemId unique id of the todo item. (route param) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
     {
    "error": false,
    "message": "Item Deleted Successfully from the list",
    "status": 200,
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
     */
    app.post(`${baseUrl}/deletesubitem/:listId/:itemId/:subItemId`, listController.deletSubItem)
    /**
     * @apiGroup TODO Single-User
     * @apiVersion  1.0.0
     * @api {post} /v1/singletodo/deletesubitem/:listId/:itemId/:subItemId api for deleting a sub todo item of todo item in a todo list.
     *
     * @apiParam {string} listId unique id of the todo list. (route param) (required)
     * @apiParam {string} itemId unique id of the todo item. (route param) (required)
     * @apiParam {string} subItemId unique id of the sub todo item. (route param) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
     {
    "error": false,
    "message": "Sub Item Deleted Successfully from the list",
    "status": 200,
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
     */

    app.get(`${baseUrl}/getList`, listController.allList)
    /**
     * @apiGroup TODO Single-User
     * @apiVersion  1.0.0
     * @api {get} /v1/singletodo/getList api for getting all todo lists.
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
     {
    "error": false,
    "message": "Previous list found",
    "status": 200,
    "data": [
        {
            "listId": "qJYuInRmt",
            "listTitle": "TEST SECOND",
            "children": [],
            "createdOn": "2019-05-26T05:05:30.000Z",
            "createdBy": "ECwO5LAlF"
        },
        {
            "listId": "XA_hk2_8P",
            "listTitle": "NEQ",
            "children": [
                {
                    "itemName": "test",
                    "itemId": "xdv-_bZiA",
                    "createdOn": "2019-05-27T12:02:38Z",
                    "children": [],
                    "createdBy": null,
                    "isCompleted": false
                },
                {
                    "itemName": "new",
                    "itemId": "OJr3j4xY4",
                    "createdOn": "2019-05-27T15:11:59Z",
                    "children": [],
                    "createdBy": null,
                    "isCompleted": false
                }
            ],
            "createdOn": "2019-05-27T12:02:06.000Z",
            "createdBy": "AXddtqYvp"
        },
        {
            "listId": "t8iriG-ti",
            "listTitle": "TEST SINGLE-USER TODO LIST",
            "children": [
                {
                    "itemName": "test item edited!!",
                    "itemId": "ePSSBWfKK",
                    "createdOn": "2019-06-02T12:46:16Z",
                    "children": [
                        {
                            "subItemName": "test sub item",
                            "subItemId": "BuBx9u3Z7",
                            "createdOn": "2019-06-02T13:01:21Z",
                            "isCompleted": false
                        }
                    ],
                    "createdBy": null,
                    "isCompleted": false
                }
            ],
            "createdOn": "2019-06-02T12:35:00.000Z",
            "createdBy": "1"
        }
    ]
}
     */
    app.get(`${baseUrl}/getuserlist/:userId`, listController.fetchedList)
    /**
     * @apiGroup TODO Single-User
     * @apiVersion  1.0.0
     * @api {post} /v1/singletodo/getuserlist/:userId api for getting todo lists created by user.
     *
     * @apiParam {string} createdBy unique user id of the user. (route param) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
     {
    "error": false,
    "message": "Previous list found",
    "status": 200,
    "data": {
        "fetchedList": [
            {
                "listId": "t8iriG-ti",
                "listTitle": "TEST SINGLE-USER TODO LIST",
                "children": [
                    {
                        "itemName": "test item edited!!",
                        "itemId": "ePSSBWfKK",
                        "createdOn": "2019-06-02T12:46:16Z",
                        "children": [
                            {
                                "subItemName": "test sub item",
                                "subItemId": "BuBx9u3Z7",
                                "createdOn": "2019-06-02T13:01:21Z",
                                "isCompleted": false
                            }
                        ],
                        "createdBy": null,
                        "isCompleted": false
                    }
                ],
                "createdOn": "2019-06-02T12:35:00.000Z",
                "createdBy": "1"
            }
        ],
        "totalItems": 1
    }
}
     */
    app.get(`${baseUrl}/getsinglelist/:listId`, listController.findListWithListId)
    /**
     * @apiGroup TODO Single-User
     * @apiVersion  1.0.0
     * @api {post} /v1/singletodo/getsinglelist/:listId api for getting single todo list.
     *
     * @apiParam {string} listId unique id of the todo list. (route param) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response (Sample):
     {
    "error": false,
    "message": "List found with given listId",
    "status": 200,
    "data": {
        "listId": "t8iriG-ti",
        "listTitle": "TEST SINGLE-USER TODO LIST",
        "children": [
            {
                "itemName": "test item edited!!",
                "itemId": "ePSSBWfKK",
                "createdOn": "2019-06-02T12:46:16Z",
                "children": [
                    {
                        "subItemName": "test sub item",
                        "subItemId": "BuBx9u3Z7",
                        "createdOn": "2019-06-02T13:01:21Z",
                        "isCompleted": false
                    }
                ],
                "createdBy": null,
                "isCompleted": false
            }
        ],
        "createdOn": "2019-06-02T12:35:00.000Z",
        "createdBy": "1",
    }
}
     */


    app.post(`${baseUrl}/isCompleted/:listId/:itemId`, listController.isCompleted)


}