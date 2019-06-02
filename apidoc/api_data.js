define({ "api": [
  {
    "group": "TODO_Multi_User",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/multitodo/editMultiTodo",
    "title": "api for editing a multi todo item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "multiTodoId",
            "description": "<p>unique id of multi todo item. (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>updated title of multi-todo item. (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "editedBy",
            "description": "<p>userId of user. (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "remarks",
            "description": "<p>remarks which has info about changes in multi-todo item. (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "     {\n    \"error\": false,\n    \"message\": \"Data Updated successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"isCompleted\": false,\n        \"changed\": \"title\",\n        \"remarks\": \"test account changed the title from new multi-todo to newTitle\",\n        \"_id\": \"5cf41c6857ab8b344b1365aa\",\n        \"transactionId\": \"FxK-RzOUV\",\n        \"multiTodoId\": \"QJx1oXjfd\",\n        \"title\": \"new multi-todo \",\n        \"createdOn\": \"2019-06-02T18:58:48.000Z\",\n        \"createdBy\": \"nMyHx1PS9\",\n        \"editedBy\": \"GihHx921w\",\n        \"__v\": 0,\n        \"editorData\": null,\n        \"id\": \"5cf41c6857ab8b344b1365aa\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/multiTodoRoute.js",
    "groupTitle": "TODO_Multi_User",
    "name": "GetV1MultitodoEditmultitodo"
  },
  {
    "group": "TODO_Multi_User",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/multitodo/getAllMultiTodo",
    "title": "api for getting all multi todos(friends & self only).",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>unique id of the user. (query param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemName",
            "description": "<p>name of todo item. (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "     {\n    \"error\": false,\n    \"message\": \"Multi Todo fetched successfully\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"title\": \"edit 4\",\n            \"isCompleted\": false,\n            \"multiTodoId\": \"Rpf9UyAB_\",\n            \"createdBy\": \"AXddtqYvp\",\n            \"createdOn\": \"2019-05-30T12:54:12.000Z\",\n            \"creatorData\": {\n                \"_id\": \"5ce3f1a342838f120c797e26\",\n                \"FirstName\": \"test1\",\n                \"LastName\": \"2\",\n                \"userId\": \"AXddtqYvp\"\n            }\n        },\n        {\n            \"title\": \"new\",\n            \"isCompleted\": false,\n            \"multiTodoId\": \"skM8k4b7K\",\n            \"createdBy\": \"AXddtqYvp\",\n            \"createdOn\": \"2019-05-31T06:56:19.000Z\",\n            \"creatorData\": {\n                \"_id\": \"5ce3f1a342838f120c797e26\",\n                \"FirstName\": \"test1\",\n                \"LastName\": \"2\",\n                \"userId\": \"AXddtqYvp\"\n            }\n        },\n        {\n            \"title\": \"new 1\",\n            \"isCompleted\": false,\n            \"multiTodoId\": \"-Xc7ZIkef\",\n            \"createdBy\": \"AXddtqYvp\",\n            \"createdOn\": \"2019-05-31T09:02:01.000Z\",\n            \"creatorData\": {\n                \"_id\": \"5ce3f1a342838f120c797e26\",\n                \"FirstName\": \"test1\",\n                \"LastName\": \"2\",\n                \"userId\": \"AXddtqYvp\"\n            }\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/multiTodoRoute.js",
    "groupTitle": "TODO_Multi_User",
    "name": "GetV1MultitodoGetallmultitodo"
  },
  {
    "group": "TODO_Multi_User",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/multitodo/getAllMultiTodo",
    "title": "api for getting all multi transactions(history).",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "     {\n    \"error\": false,\n    \"message\": \"Multi Todo Transaction fetched successfully\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"isCompleted\": false,\n            \"changed\": \"title\",\n            \"remarks\": \"test1 2 created a todo new 2\",\n            \"transactionId\": \"lGnK5Y3nvA\",\n            \"multiTodoId\": \"nMyHx1PS9\",\n            \"title\": \"new 2\",\n            \"createdOn\": \"2019-05-29T06:36:49.000Z\",\n            \"createdBy\": \"AXddtqYvp\",\n            \"editedBy\": \"undefined\",\n            \"editorData\": null\n        },\n        {\n            \"isCompleted\": false,\n            \"changed\": \"title\",\n            \"remarks\": \"test1 2 changed the title from new 2 to edited 2\",\n            \"transactionId\": \"ZT6fy8p0W\",\n            \"multiTodoId\": \"nMyHx1PS9\",\n            \"title\": \"new 2\",\n            \"createdOn\": \"2019-05-29T06:56:15.000Z\",\n            \"createdBy\": \"AXddtqYvp\",\n            \"editedBy\": \"AXddtqYvp\",\n            \"editorData\": {\n                \"_id\": \"5ce3f1a342838f120c797e26\",\n                \"FirstName\": \"test1\",\n                \"LastName\": \"2\",\n                \"userId\": \"AXddtqYvp\"\n            }\n        },\n        {\n            \"isCompleted\": false,\n            \"changed\": \"title\",\n            \"remarks\": \"Varun Dhariyal changed the title from edited 2 to edit 23\",\n            \"transactionId\": \"a7oFrxct7\",\n            \"multiTodoId\": \"nMyHx1PS9\",\n            \"title\": \"edited 2\",\n            \"createdOn\": \"2019-05-29T07:04:24.000Z\",\n            \"createdBy\": \"AXddtqYvp\",\n            \"editedBy\": \"ydLN7X8CM\",\n            \"editorData\": {\n                \"_id\": \"5cda4cfe94c59303dfe114ff\",\n                \"FirstName\": \"Varun\",\n                \"LastName\": \"Dhariyal\",\n                \"userId\": \"ydLN7X8CM\"\n            }\n        },\n        {\n            \"isCompleted\": false,\n            \"changed\": \"title\",\n            \"remarks\": \"Varun Dhariyal created a todo new\",\n            \"transactionId\": \"OGvrlrHKOA\",\n            \"multiTodoId\": \"gRcsmBFsJ\",\n            \"title\": \"new\",\n            \"createdOn\": \"2019-05-31T14:50:24.000Z\",\n            \"createdBy\": \"ydLN7X8CM\",\n            \"editedBy\": \"undefined\",\n            \"editorData\": null\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/multiTodoRoute.js",
    "groupTitle": "TODO_Multi_User",
    "name": "GetV1MultitodoGetallmultitodo"
  },
  {
    "group": "TODO_Multi_User",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/multitodo/getMultiTodoTrn/:multiTodoId",
    "title": "api for getting a multi todo's history.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "multiTodoId",
            "description": "<p>unique id of multi todo item. (route param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "     {\n    \"error\": false,\n    \"message\": \"Multi Todo Transaction fetched successfully\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"isCompleted\": false,\n            \"changed\": \"title\",\n            \"remarks\": \"test1 2 created a todo new 2\",\n            \"transactionId\": \"lGnK5Y3nvA\",\n            \"multiTodoId\": \"nMyHx1PS9\",\n            \"title\": \"new 2\",\n            \"createdOn\": \"2019-05-29T06:36:49.000Z\",\n            \"createdBy\": \"AXddtqYvp\",\n            \"editedBy\": \"undefined\",\n            \"editorData\": null\n        },\n        {\n            \"isCompleted\": false,\n            \"changed\": \"title\",\n            \"remarks\": \"test1 2 changed the title from new 2 to edited 2\",\n            \"transactionId\": \"ZT6fy8p0W\",\n            \"multiTodoId\": \"nMyHx1PS9\",\n            \"title\": \"new 2\",\n            \"createdOn\": \"2019-05-29T06:56:15.000Z\",\n            \"createdBy\": \"AXddtqYvp\",\n            \"editedBy\": \"AXddtqYvp\",\n            \"editorData\": {\n                \"_id\": \"5ce3f1a342838f120c797e26\",\n                \"FirstName\": \"test1\",\n                \"LastName\": \"2\",\n                \"userId\": \"AXddtqYvp\"\n            }\n        },\n        {\n            \"isCompleted\": false,\n            \"changed\": \"title\",\n            \"remarks\": \"Varun Dhariyal changed the title from edited 2 to edit 23\",\n            \"transactionId\": \"a7oFrxct7\",\n            \"multiTodoId\": \"nMyHx1PS9\",\n            \"title\": \"edited 2\",\n            \"createdOn\": \"2019-05-29T07:04:24.000Z\",\n            \"createdBy\": \"AXddtqYvp\",\n            \"editedBy\": \"ydLN7X8CM\",\n            \"editorData\": {\n                \"_id\": \"5cda4cfe94c59303dfe114ff\",\n                \"FirstName\": \"Varun\",\n                \"LastName\": \"Dhariyal\",\n                \"userId\": \"ydLN7X8CM\"\n            }\n        },\n        {\n            \"isCompleted\": false,\n            \"changed\": \"title\",\n            \"remarks\": \"Varun Dhariyal changed the title from edit 23 to edited1\",\n            \"transactionId\": \"Lj6R_ki33\",\n            \"multiTodoId\": \"nMyHx1PS9\",\n            \"title\": \"edit 23\",\n            \"createdOn\": \"2019-05-29T07:16:42.000Z\",\n            \"createdBy\": \"AXddtqYvp\",\n            \"editedBy\": \"ydLN7X8CM\",\n            \"editorData\": {\n                \"_id\": \"5cda4cfe94c59303dfe114ff\",\n                \"FirstName\": \"Varun\",\n                \"LastName\": \"Dhariyal\",\n                \"userId\": \"ydLN7X8CM\"\n            }\n        },\n        {\n            \"isCompleted\": false,\n            \"changed\": \"title\",\n            \"remarks\": \"test1 2 changed the title from edited1 to edit2\",\n            \"transactionId\": \"QMV4xAsH2\",\n            \"multiTodoId\": \"nMyHx1PS9\",\n            \"title\": \"edited1\",\n            \"createdOn\": \"2019-05-29T07:18:41.000Z\",\n            \"createdBy\": \"AXddtqYvp\",\n            \"editedBy\": \"AXddtqYvp\",\n            \"editorData\": {\n                \"_id\": \"5ce3f1a342838f120c797e26\",\n                \"FirstName\": \"test1\",\n                \"LastName\": \"2\",\n                \"userId\": \"AXddtqYvp\"\n            }\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/multiTodoRoute.js",
    "groupTitle": "TODO_Multi_User",
    "name": "GetV1MultitodoGetmultitodotrnMultitodoid"
  },
  {
    "group": "TODO_Multi_User",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/multitodo/undoHistory/:multiTodoId",
    "title": "api for undoing/reverting a multi todo's change.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "multiTodoId",
            "description": "<p>unique id of multi todo item. (route param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "transactionId",
            "description": "<p>unique transaction id of multi-todo's transactions. (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "     {\n    \"error\": false,\n    \"message\": \"Undo/Revert Successfully done\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"isCompleted\": false,\n            \"changed\": \"title\",\n            \"remarks\": \"test1 2 created a todo new 2\",\n            \"transactionId\": \"lGnK5Y3nvA\",\n            \"multiTodoId\": \"nMyHx1PS9\",\n            \"title\": \"new 2\",\n            \"createdOn\": \"2019-05-29T06:36:49.000Z\",\n            \"createdBy\": \"AXddtqYvp\",\n            \"editedBy\": \"undefined\",\n            \"editorData\": null\n        },\n        {\n            \"isCompleted\": false,\n            \"changed\": \"title\",\n            \"remarks\": \"test1 2 changed the title from new 2 to edited 2\",\n            \"transactionId\": \"ZT6fy8p0W\",\n            \"multiTodoId\": \"nMyHx1PS9\",\n            \"title\": \"new 2\",\n            \"createdOn\": \"2019-05-29T06:56:15.000Z\",\n            \"createdBy\": \"AXddtqYvp\",\n            \"editedBy\": \"AXddtqYvp\",\n            \"editorData\": {\n                \"_id\": \"5ce3f1a342838f120c797e26\",\n                \"FirstName\": \"test1\",\n                \"LastName\": \"2\",\n                \"userId\": \"AXddtqYvp\"\n            }\n        },\n        {\n            \"isCompleted\": false,\n            \"changed\": \"title\",\n            \"remarks\": \"Varun Dhariyal changed the title from edited 2 to edit 23\",\n            \"transactionId\": \"a7oFrxct7\",\n            \"multiTodoId\": \"nMyHx1PS9\",\n            \"title\": \"edited 2\",\n            \"createdOn\": \"2019-05-29T07:04:24.000Z\",\n            \"createdBy\": \"AXddtqYvp\",\n            \"editedBy\": \"ydLN7X8CM\",\n            \"editorData\": {\n                \"_id\": \"5cda4cfe94c59303dfe114ff\",\n                \"FirstName\": \"Varun\",\n                \"LastName\": \"Dhariyal\",\n                \"userId\": \"ydLN7X8CM\"\n            }\n        },\n        {\n            \"isCompleted\": false,\n            \"changed\": \"title\",\n            \"remarks\": \"Varun Dhariyal changed the title from edit 23 to edited1\",\n            \"transactionId\": \"Lj6R_ki33\",\n            \"multiTodoId\": \"nMyHx1PS9\",\n            \"title\": \"edit 23\",\n            \"createdOn\": \"2019-05-29T07:16:42.000Z\",\n            \"createdBy\": \"AXddtqYvp\",\n            \"editedBy\": \"ydLN7X8CM\",\n            \"editorData\": {\n                \"_id\": \"5cda4cfe94c59303dfe114ff\",\n                \"FirstName\": \"Varun\",\n                \"LastName\": \"Dhariyal\",\n                \"userId\": \"ydLN7X8CM\"\n            }\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/multiTodoRoute.js",
    "groupTitle": "TODO_Multi_User",
    "name": "GetV1MultitodoUndohistoryMultitodoid"
  },
  {
    "group": "TODO_Multi_User",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/multitodo/addMultiTodo",
    "title": "api for adding a multi todo item in multitodo-user list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of multi todo item. (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>userId of user. (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "remarks",
            "description": "<p>remarks field contains info about multi-todo item(creation). (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "     {\n    \"error\": false,\n    \"message\": \"ToDoItem Created Successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"isCompleted\": false,\n        \"changed\": \"title\",\n        \"remarks\": \"Varun Dhariyal created a todo new multi-todo\",\n        \"_id\": \"5cf4190957ab8b344b1365a9\",\n        \"transactionId\": \"1qNBFtnlY\",\n        \"multiTodoId\": \"QJx1oXjfd\",\n        \"title\": \"new multi-todo \",\n        \"createdOn\": \"2019-06-02T18:44:25.000Z\",\n        \"createdBy\": \"nMyHx1PS9\",\n        \"__v\": 0,\n        \"editorData\": null,\n        \"id\": \"5cf4190957ab8b344b1365a9\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/multiTodoRoute.js",
    "groupTitle": "TODO_Multi_User",
    "name": "PostV1MultitodoAddmultitodo"
  },
  {
    "group": "TODO_Multi_User",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/multitodo/deleteMultiTodo",
    "title": "api for deleting a multi todo.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "multiTodoId",
            "description": "<p>unique id of multi todo item. (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "     {\n    \"error\": false,\n    \"message\": \"Multi Todo Deleted Successfully\",\n    \"status\": 200\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/multiTodoRoute.js",
    "groupTitle": "TODO_Multi_User",
    "name": "PostV1MultitodoDeletemultitodo"
  },
  {
    "group": "TODO_Single_User",
    "version": "1.0.0",
    "type": "get",
    "url": "/v1/singletodo/getList",
    "title": "api for getting all todo lists.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "     {\n    \"error\": false,\n    \"message\": \"Previous list found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"listId\": \"qJYuInRmt\",\n            \"listTitle\": \"TEST SECOND\",\n            \"children\": [],\n            \"createdOn\": \"2019-05-26T05:05:30.000Z\",\n            \"createdBy\": \"ECwO5LAlF\"\n        },\n        {\n            \"listId\": \"XA_hk2_8P\",\n            \"listTitle\": \"NEQ\",\n            \"children\": [\n                {\n                    \"itemName\": \"test\",\n                    \"itemId\": \"xdv-_bZiA\",\n                    \"createdOn\": \"2019-05-27T12:02:38Z\",\n                    \"children\": [],\n                    \"createdBy\": null,\n                    \"isCompleted\": false\n                },\n                {\n                    \"itemName\": \"new\",\n                    \"itemId\": \"OJr3j4xY4\",\n                    \"createdOn\": \"2019-05-27T15:11:59Z\",\n                    \"children\": [],\n                    \"createdBy\": null,\n                    \"isCompleted\": false\n                }\n            ],\n            \"createdOn\": \"2019-05-27T12:02:06.000Z\",\n            \"createdBy\": \"AXddtqYvp\"\n        },\n        {\n            \"listId\": \"t8iriG-ti\",\n            \"listTitle\": \"TEST SINGLE-USER TODO LIST\",\n            \"children\": [\n                {\n                    \"itemName\": \"test item edited!!\",\n                    \"itemId\": \"ePSSBWfKK\",\n                    \"createdOn\": \"2019-06-02T12:46:16Z\",\n                    \"children\": [\n                        {\n                            \"subItemName\": \"test sub item\",\n                            \"subItemId\": \"BuBx9u3Z7\",\n                            \"createdOn\": \"2019-06-02T13:01:21Z\",\n                            \"isCompleted\": false\n                        }\n                    ],\n                    \"createdBy\": null,\n                    \"isCompleted\": false\n                }\n            ],\n            \"createdOn\": \"2019-06-02T12:35:00.000Z\",\n            \"createdBy\": \"1\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/singleTodoRoute.js",
    "groupTitle": "TODO_Single_User",
    "name": "GetV1SingletodoGetlist"
  },
  {
    "group": "TODO_Single_User",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/singletodo/addchilditem/:listId/:itemid",
    "title": "api for adding a sub todo item to single todo list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>unique id of the todo list. (route param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>unique id of the todo list's item. (route param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemName",
            "description": "<p>name of sub todo item. (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "     {\n    \"error\": false,\n    \"message\": \"ToDo sub/child item added to list successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"listId\": \"t8iriG-ti\",\n        \"listTitle\": \"TEST SINGLE-USER TODO LIST\",\n        \"children\": [\n            {\n                \"itemName\": \"test item single-user todo\",\n                \"itemId\": \"ePSSBWfKK\",\n                \"createdOn\": \"2019-06-02T12:46:16Z\",\n                \"children\": [\n                    {\n                        \"subItemName\": \"test sub item\",\n                        \"subItemId\": \"BuBx9u3Z7\",\n                        \"createdOn\": \"2019-06-02T13:01:21Z\",\n                        \"isCompleted\": false\n                    }\n                ],\n                \"createdBy\": null,\n                \"isCompleted\": false\n            }\n        ],\n        \"createdOn\": \"2019-06-02T12:35:00.000Z\",\n        \"_id\": \"5cf3c274c69b450e894a2314\",\n        \"createdBy\": \"1\",\n        \"__v\": 2\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/singleTodoRoute.js",
    "groupTitle": "TODO_Single_User",
    "name": "PostV1SingletodoAddchilditemListidItemid"
  },
  {
    "group": "TODO_Single_User",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/singletodo/additem/:listId",
    "title": "api for adding an todo item to single todo list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>unique id of the todo list. (route param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemName",
            "description": "<p>name of todo item. (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "    {\n   \"error\":false,\n   \"message\":\"ToDo item added to list successfully\",\n   \"status\":200,\n   \"data\":{\n      \"listId\":\"t8iriG-ti\",\n      \"listTitle\":\"TEST SINGLE-USER TODO LIST\",\n      \"children\":[\n         {\n            \"itemName\":\"test item single-user todo\",\n            \"itemId\":\"ePSSBWfKK\",\n            \"createdOn\":\"2019-06-02T12:46:16Z\",\n            \"children\":[],\n            \"isCompleted\":false\n         }\n      ],\n      \"createdOn\":\"2019-06-02T12:35:00.000Z\",\n      \"_id\":\"5cf3c274c69b450e894a2314\",\n      \"createdBy\":\"1\",\n      \"__v\":1\n   }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/singleTodoRoute.js",
    "groupTitle": "TODO_Single_User",
    "name": "PostV1SingletodoAdditemListid"
  },
  {
    "group": "TODO_Single_User",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/singletodo/create/:userId",
    "title": "api for creating an empty single todo list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>user id of the user. (route param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listTitle",
            "description": "<p>title of the todo list. (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "        {\n   \"error\":false,\n   \"message\":\"New To-Do list created success\",\n   \"status\":200,\n   \"data\":{\n      \"listId\":\"t8iriG-ti\",\n      \"listTitle\":\"TEST SINGLE-USER TODO LIST\",\n      \"children\":[],\n      \"createdOn\":\"2019-06-02T12:35:00.000Z\",\n      \"_id\":\"5cf3c274c69b450e894a2314\",\n      \"createdBy\":\"1\",\n      \"__v\":0\n   }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/singleTodoRoute.js",
    "groupTitle": "TODO_Single_User",
    "name": "PostV1SingletodoCreateUserid"
  },
  {
    "group": "TODO_Single_User",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/singletodo/deleteitem/:listId/:itemId",
    "title": "api for deleting a todo item of todo list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>unique id of the todo list. (route param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>unique id of the todo item. (route param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "     {\n    \"error\": false,\n    \"message\": \"Item Deleted Successfully from the list\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/singleTodoRoute.js",
    "groupTitle": "TODO_Single_User",
    "name": "PostV1SingletodoDeleteitemListidItemid"
  },
  {
    "group": "TODO_Single_User",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/singletodo/deleteList/:listId",
    "title": "api for deleting a todo list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>unique id of the todo list. (route param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "     {\n    \"error\": false,\n    \"message\": \"todo list deleted succesfully\",\n    \"status\": 200,\n    \"data\": {\n        \"listId\": \"t8iriG-ti\",\n        \"listTitle\": \"TEST SINGLE-USER TODO LIST\",\n        \"children\": [],\n        \"createdOn\": \"2019-06-02T12:35:00.000Z\",\n        \"_id\": \"5cf3c274c69b450e894a2314\",\n        \"createdBy\": \"1\",\n        \"__v\": 2\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/singleTodoRoute.js",
    "groupTitle": "TODO_Single_User",
    "name": "PostV1SingletodoDeletelistListid"
  },
  {
    "group": "TODO_Single_User",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/singletodo/deletesubitem/:listId/:itemId/:subItemId",
    "title": "api for deleting a sub todo item of todo item in a todo list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>unique id of the todo list. (route param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>unique id of the todo item. (route param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemId",
            "description": "<p>unique id of the sub todo item. (route param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "     {\n    \"error\": false,\n    \"message\": \"Sub Item Deleted Successfully from the list\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/singleTodoRoute.js",
    "groupTitle": "TODO_Single_User",
    "name": "PostV1SingletodoDeletesubitemListidItemidSubitemid"
  },
  {
    "group": "TODO_Single_User",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/singletodo/edititem/:listId/:itemid",
    "title": "api for editing a todo item in a todo list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>unique id of the todo list. (route param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>unique id of the todo list's item. (route param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemName",
            "description": "<p>name of sub todo item. (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "     {\n    \"error\": false,\n    \"message\": \"Item Updated Successfully in List\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/singleTodoRoute.js",
    "groupTitle": "TODO_Single_User",
    "name": "PostV1SingletodoEdititemListidItemid"
  },
  {
    "group": "TODO_Single_User",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/singletodo/getsinglelist/:listId",
    "title": "api for getting single todo list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>unique id of the todo list. (route param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "     {\n    \"error\": false,\n    \"message\": \"List found with given listId\",\n    \"status\": 200,\n    \"data\": {\n        \"listId\": \"t8iriG-ti\",\n        \"listTitle\": \"TEST SINGLE-USER TODO LIST\",\n        \"children\": [\n            {\n                \"itemName\": \"test item edited!!\",\n                \"itemId\": \"ePSSBWfKK\",\n                \"createdOn\": \"2019-06-02T12:46:16Z\",\n                \"children\": [\n                    {\n                        \"subItemName\": \"test sub item\",\n                        \"subItemId\": \"BuBx9u3Z7\",\n                        \"createdOn\": \"2019-06-02T13:01:21Z\",\n                        \"isCompleted\": false\n                    }\n                ],\n                \"createdBy\": null,\n                \"isCompleted\": false\n            }\n        ],\n        \"createdOn\": \"2019-06-02T12:35:00.000Z\",\n        \"createdBy\": \"1\",\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/singleTodoRoute.js",
    "groupTitle": "TODO_Single_User",
    "name": "PostV1SingletodoGetsinglelistListid"
  },
  {
    "group": "TODO_Single_User",
    "version": "1.0.0",
    "type": "post",
    "url": "/v1/singletodo/getuserlist/:userId",
    "title": "api for getting todo lists created by user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>unique user id of the user. (route param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (Sample):",
          "content": "     {\n    \"error\": false,\n    \"message\": \"Previous list found\",\n    \"status\": 200,\n    \"data\": {\n        \"fetchedList\": [\n            {\n                \"listId\": \"t8iriG-ti\",\n                \"listTitle\": \"TEST SINGLE-USER TODO LIST\",\n                \"children\": [\n                    {\n                        \"itemName\": \"test item edited!!\",\n                        \"itemId\": \"ePSSBWfKK\",\n                        \"createdOn\": \"2019-06-02T12:46:16Z\",\n                        \"children\": [\n                            {\n                                \"subItemName\": \"test sub item\",\n                                \"subItemId\": \"BuBx9u3Z7\",\n                                \"createdOn\": \"2019-06-02T13:01:21Z\",\n                                \"isCompleted\": false\n                            }\n                        ],\n                        \"createdBy\": null,\n                        \"isCompleted\": false\n                    }\n                ],\n                \"createdOn\": \"2019-06-02T12:35:00.000Z\",\n                \"createdBy\": \"1\"\n            }\n        ],\n        \"totalItems\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/singleTodoRoute.js",
    "groupTitle": "TODO_Single_User",
    "name": "PostV1SingletodoGetuserlistUserid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc\",\n        \"userDetails\": {\n        \"mobileNumber\": 2234435524,\n        \"email\": \"someone@mail.com\",\n        \"lastName\": \"Sengar\",\n        \"firstName\": \"Rishabh\",\n        \"userId\": \"-E9zxTYA8\"\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "route/route.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  }
] });
