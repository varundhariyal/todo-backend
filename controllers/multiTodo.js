const mongoose = require('mongoose')
const response = require('../libs/response')
const time = require('../libs/timeLib')
const check = require('../libs/checkLib')
const logger = require('../libs/loggerLib')
const shortId = require('shortid')

//models
const Multitodo = require('../model/Multitodo')
const MultitodoTransaction = require('../model/MultitodoTransaction')
const FriendModel=require('../model/Friend')

//function to add a todo item which also contains saving todo item in transactions as history
let addTodoItem = (req, res) => {
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (!check.isEmpty(req.body.title)) {
                resolve(req)
            } else {
                logger.error('title is required', 'multiToDo: addToDoItem()', 10);
                let apiResponse = response.generate(true, 'Todo item title is missing in the request', 404, null);
                reject(apiResponse);
            }
        })
    } //end validation

    let saveTodoItem = () => {
        return new Promise((resolve, reject) => {
            Multitodo.findOne({
                    multiTodoId: req.body.multiTodoId,
                    title: req.body.title,
                    createdBy: req.body.createdBy
                },
                (err, foundTodo) => {
                    if (err) {
                        logger.error(err.message, 'multiToDo: saveTodoItem()', 10);
                        let apiResponse = response.generate(true, err.message, 500, null);
                        reject(apiResponse);
                    } else if (!check.isEmpty(foundTodo)) {
                        logger.error('to do title already exist', 'multiToDo.js: saveToDoItem()', 7);
                        let apiResponse = response.generate(true, 'Todo item already exists', 400, null);
                        reject(apiResponse);
                    } else {
                        let todoObject = new Multitodo({
                            multiTodoId: shortId.generate(),
                            title: req.body.title,
                            isCompleted: req.body.isCompleted,
                            createdBy: req.body.createdBy,
                            createdOn: time.now()
                        })
                        todoObject.save((err, newTodo) => {
                            if (err) {
                                logger.error(err.message, 'multiToDo: saveToDoItem()', 10);
                                let apiResponse = response.generate(true, 'Unable to create new todo parent', 500, null);
                                reject(apiResponse);
                            } else {
                                //convert mongoose obj to js obj
                                todoJsObject = newTodo.toObject()
                                resolve(todoJsObject)
                            }
                        })
                    }
                }
            )
        })
    } //end saveTodoItem

    //now to save history ,store todo item in multitodo transaction db
    let saveTransaction = (todoItem) => {
        return new Promise((resolve, reject) => {
            let todoTransaction = new MultitodoTransaction({
                transactionId: shortId.generate(),
                multiTodoId: todoItem.multiTodoId,
                title: todoItem.title,
                isCompleted: todoItem.isCompleted,
                changed: 'title',
                createdOn: time.now(),
                createdBy: todoItem.createdBy,
                editedBy: req.body.editedBy,
                remarks: req.body.remarks
            })
            todoTransaction.save((err, saveTransaction) => {
                if (err) {
                    logger.error(err.message, 'multiToDo: saveTransaction()', 10);
                    let apiResponse = response.generate(true, 'Unable to save transaction', 500, null);
                    reject(apiResponse);
                } else {
                    todoTransactionJsObj = saveTransaction.toObject()
                    resolve(todoTransactionJsObj)
                }
            })
        })
    }
    validateInput(req, res)
        .then(saveTodoItem)
        .then(saveTransaction)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'ToDoItem Created Successfully', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        //error handler
        .catch((err) => {
            //console.log(err)
            res.status(err.status)
            res.send(err)
        });

}
//end addTodoItem


//function to display/get all multi todos
let getMultiTodo = (req, res) => {
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (!check.isEmpty(Multitodo)) {
                resolve(req)
            } else {
                logger.error('No multitodo found', 'multiToDo: getMultiTodo()', 10);
                let apiResponse = response.generate(true, 'Multi Todo Not Found', 404, null);
                reject(apiResponse);

            }
        })
    } //end validate input

    let getAllItems = () => {
        return new Promise((resolve, reject) => {
            Multitodo.find()
                .lean()
                .limit(10)
                .populate({
                    path: 'creatorData',
                    select: 'userId FirstName LastName'
                })
                .exec((err, multiTodo) => {
                    if (err) {
                        logger.error(err.message, 'multiToDo: getallitems()', 10);
                        let apiResponse = response.generate(true, 'error while getting data- ' + err.message, 500, null);
                        reject(apiResponse);
                    } else {
                        resolve(multiTodo)
                    }
                })
        })
    }
    validateInput(req, res)
        .then(getAllItems)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Multi Todo fetched successfully', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            res.status(err.status)
            res.send(err)
        })
} //end getMultiTodo

//function to  Edit multi todo and save history in multitodo transaction DB
let editMultiTodo = (req, res) => {
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (!check.isEmpty(req.body.multiTodoId)) {
                if (!check.isEmpty(req.body.title)) {
                    if (!check.isEmpty(req.body.editedBy)) {
                        resolve(req);
                    } else {
                        logger.error('editBy is missing or null', 'multiToDoController: editMultiTodo() =>validateInput', 10);
                        let apiResponse = response.generate(true, 'editBy is missing or null in the request', 404, null);
                        reject(apiResponse);
                    }
                } else {
                    logger.error('title is missing or null', 'multiToDoController: editMultitodo() =>validateInput', 10);
                    let apiResponse = response.generate(true, 'title is missing or null in the request', 404, null);
                    reject(apiResponse);
                }
            } else {
                logger.error('id is required', 'multiToDoController: editMultitodo()=>validateInput', 10);
                let apiResponse = response.generate(true, 'multi todo  id is missing in the request', 404, null);
                reject(apiResponse);
            }
        });
    } //end validate input

    let editTodo = () => {
        return new Promise((resolve, reject) => {
            let option = {
                title: req.body.title
            }
            Multitodo.findOneAndUpdate({
                    multiTodoId: req.body.multiTodoId
                },
                option,
                (err, updatedMultiTodo) => {
                    if (err) {
                        logger.error(err.message, 'multiToDo: editMultitodo()=>editTodo', 10);
                        let apiResponse = response.generate(true, 'error while getting data- ' + err.message, 500, null);
                        reject(apiResponse);
                    } else {
                        resolve(updatedMultiTodo);
                    }
                }
            )
        })
    } //end editTodo
    //now save change in transaction db also providing edited by info
    let saveDataInMultiTodoTransaction = (updatedMultiTodo) => {
        console.log('\n\n\ntest')

        console.log(updatedMultiTodo);
        return new Promise((resolve, reject) => {
            let saveData = new MultitodoTransaction({
                transactionId: shortId.generate(),
                multiTodoId: updatedMultiTodo.multiTodoId,
                title: updatedMultiTodo.title,
                isCompleted: updatedMultiTodo.isCompleted,
                changed: 'title',
                createdOn: time.now(),
                createdBy: updatedMultiTodo.createdBy,
                editedBy: req.body.editedBy,
                remarks: req.body.remarks
            })
            saveData.save((err, savedTransaction) => {
                if (err) {
                    logger.error(err.message, 'multiToDoController: editToDoItemTitleFunction() =>saveDataInMultiTodoTransaction', 10);
                    let apiResponse = response.generate(true, 'Unable to save transaction', 500, null);
                    reject(apiResponse);
                } else {
                    let transactionJsObj = savedTransaction.toObject()
                    console.log('\n\n\ntest')
                    console.log(transactionJsObj);
                    resolve(transactionJsObj)
                }
            })
        })
    } //end saveDataInMultiTodoTransaction
    validateInput(req, res)
        .then(editTodo)
        .then(saveDataInMultiTodoTransaction)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Data Updated successfully', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            //console.log(err)
            res.status(err.status)
            res.send(err)
        });
} //end editMultiTodo func

//function to get multitodo transaction by id
let getMultiTodoTransaction = (req, res) => {
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (!check.isEmpty(MultitodoTransaction)) {
                resolve(req);
            } else {
                logger.error('No old todo transacion found', 'multiToDoController: getMultiToDoTransaction()', 10);
                let apiResponse = response.generate(true, 'No old todo transaction present', 404, null);
                reject(apiResponse);
            }
        })
    }
    let getTodoTransaction = () => {
        return new Promise((resolve, reject) => {
            MultitodoTransaction.find().populate({
                    path: 'editorData',
                    select: 'userId FirstName LastName'
                })
                .exec((err, result) => {
                    if (err) {
                        logger.error(err.message, 'multiToDoController: getToDoTransaction()', 10);
                        let apiResponse = response.generate(true, 'error while getting data- from MultiTodoTransaction ' + err.message, 500, null);
                        reject(apiResponse);
                    } else {
                        resolve(result)
                    }
                })
        })
    }
    validateInput(req, res)
        .then(getTodoTransaction)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Multi Todo Transaction fetched successfully', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            //console.log(err)
            res.status(err.status)
            res.send(err)
        });
}

//function to get multi todo transaction with trn id
let getMultiTodoTrn = (req, res) => {
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (!check.isEmpty(MultitodoTransaction)) {
                resolve(req);
            } else {
                logger.error('No old todo transacion found', 'multiToDoController: getMultiToDoTransaction()', 10);
                let apiResponse = response.generate(true, 'No old todo transaction present', 404, null);
                reject(apiResponse);
            }
        })
    }
    let getTodoTransaction = () => {
        return new Promise((resolve, reject) => {
            MultitodoTransaction.find({
                    'multiTodoId': req.params.multiTodoId
                }).populate({
                    path: 'editorData',
                    select: 'userId FirstName LastName'
                })
                .exec((err, result) => {
                    if (err) {
                        logger.error(err.message, 'multiToDoController: getToDoTransaction()', 10);
                        let apiResponse = response.generate(true, 'error while getting data- from MultiTodoTransaction ' + err.message, 500, null);
                        reject(apiResponse);
                    } else {
                        resolve(result)
                    }
                })
        })
    }
    validateInput(req, res)
        .then(getTodoTransaction)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Multi Todo Transaction fetched successfully', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            //console.log(err)
            res.status(err.status)
            res.send(err)
        });
}

//function to undo/revert change and show last transaction
let undoHistory = (req, res) => {
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (!check.isEmpty(req.params.multiTodoId)) {
                if (!check.isEmpty(req.body.transactionId)) {
                    resolve(req)
                } else {
                    logger.error('transaction id is missing or null', 'multiToDoController: editMultitodo() =>validateInput', 10);
                    let apiResponse = response.generate(true, 'transaction id is missing or null in the request', 404, null);
                    reject(apiResponse);
                }
            } else {
                logger.error('mutlitodo id is required', 'multiToDoController: editMultitodo()=>validateInput', 10);
                let apiResponse = response.generate(true, 'multi todo  id is missing in the request', 404, null);
                reject(apiResponse);
            }
        });
    } //end validate input

    //function to find current transaction multitodo
    let findTransaction = () => {
        console.log('\n\n\ninside findTrans')
        return new Promise((resolve, reject) => {
            MultitodoTransaction.findOne({
                    'multiTodoId': req.params.multiTodoId,
                    'transactionId': req.body.transactionId
                },
                (err, foundTransaction) => {
                    if (err) {
                        logger.error(`error finding multitodo transaction ${err}`, `multiTodo.js=>undoHistory-findTransaction`, 10)
                        let apiResponse = response.generate(true, `Error getting multi-todo transaction`, 500, null)
                        reject(apiResponse)
                    } else {
                        resolve(foundTransaction)
                    }
                }
            )
        })
    } //end findTransaction

    //function to check title change and revert back to previous title.
    let multiTodoUndo = (foundTransaction) => {
        console.log('\n\n\ninside foundTransaction')
        console.log(foundTransaction)
        return new Promise((resolve, reject) => {
            //if title is changed then update multitodo 
            if (foundTransaction.changed == "title") {
                let lastTitle = {
                    title: foundTransaction.title
                }
                Multitodo.findOneAndUpdate({
                        multiTodoId: foundTransaction.multiTodoId
                    },
                    lastTitle, (err, updatedMultiTodo) => {
                        if (err) {
                            logger.error(`Error updating multitodo title ${err}`, `multiTodo.js-undoHistory-multiTodoUndo`, 10)
                            let apiResponse = response.generate(true, `Error updating multi current todo title to previous title`, 500, 10)
                            reject(apiResponse)
                        } else {
                            resolve(updatedMultiTodo)
                        }
                    })
            }
        })
    } //end multiTodoUndo

    //function to delete last transaction
    let deleteLastTransaction = () => {
        return new Promise((resolve, reject) => {
            MultitodoTransaction.findOneAndDelete({
                    'multiTodoId': req.params.multiTodoId,
                    transactionId: req.body.transactionId
                },
                (err, result) => {
                    if (err) {
                        logger.error(`Error deleting multitodo transaction ${err}`, `multiTodo.js-undoHistory-deleteTransction`, 10)
                        let apiResponse = response.generate(true, `Error deleting multitodo transaction`, 500, 10)
                        reject(apiResponse)
                    } else {
                        resolve(result)
                    }
                }
            )
        })
    } //end deleteLastTransaction

    let getTodoTransaction = () => {
        return new Promise((resolve, reject) => {
            MultitodoTransaction.find({
                    'multiTodoId': req.params.multiTodoId
                }).populate({
                    path: 'editorData',
                    select: 'userId FirstName LastName'
                })
                .exec((err, result) => {
                    if (err) {
                        logger.error(err.message, 'multiToDoController: getToDoTransaction()', 10);
                        let apiResponse = response.generate(true, 'error while getting data- from MultiTodoTransaction ' + err.message, 500, null);
                        reject(apiResponse);
                    } else {
                        resolve(result)
                    }
                })
        })
    }

    validateInput(req, res)
        .then(findTransaction)
        .then(multiTodoUndo)
        .then(deleteLastTransaction)
        .then(getTodoTransaction)
        .then((resolve) => {
            logger.info(`Undo task success`, `multiTodo.js=>undoHistory()`, 10)
            let apiResponse = response.generate(false, `Undo/Revert Successfully done`, 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            res.status(err.status)
            res.send(err)
        })

}

//function to delete a multitodo
let deleteMultiTodo = (req, res) => {
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (!check.isEmpty(req.body.multiTodoId)) {
                resolve(req)
            } else {
                logger.error('mutlitodo id is required', 'multiToDo.js: deleteMultitodo()=>validateInput', 10);
                let apiResponse = response.generate(true, 'multi todo  id is missing in the request', 404, null);
                reject(apiResponse);
            }
        });
    } //end validate input
    let deleteTodo = () => {
        return new Promise((resolve, reject) => {
            Multitodo.findOneAndDelete({
                    'multiTodoId': req.body.multiTodoId
                },
                (err, todoDelete) => {
                    if (err) {
                        logger.error('error deleting multi todo', 'multiToDo.js: deleteMultitodo()=>deleteTodo', 10);
                        let apiResponse = response.generate(true, 'error deleting multi todo', 500, null);
                        reject(apiResponse);
                    } else {
                        resolve(todoDelete)
                    }
                }
            )
        })
    } //end deleteTodo

    validateInput(req, res)
        .then(deleteTodo)
        .then(getMultiTodo)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Multi Todo Deleted Successfully', 200, resolve);
            res.status(200)
            res.send(apiResponse);
        })
        .catch((err) => {
            res.status(err.status)
            res.send(err)
        })

}

//exports
module.exports = {
    addToDoItem: addTodoItem,
    getMultiTodo: getMultiTodo,
    getMultiToDoTransaction: getMultiTodoTransaction,
    getMultiTodoTrn: getMultiTodoTrn,
    editMultiTodo: editMultiTodo,
    undoHistory: undoHistory,
    deleteMultiTodo: deleteMultiTodo
}