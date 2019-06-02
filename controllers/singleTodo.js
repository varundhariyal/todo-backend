const mongoose = require('mongoose')
const shortid = require('shortid')
const time = require('../libs/timeLib')
const check = require('../libs/checkLib')
const logger = require('../libs/loggerLib')
const response = require('../libs/response')

//models
const ListModel = require('../model/List')

//function to find all lists in db
let findAllList = (req, res) => {
    ListModel.find()
        .lean()
        .select('-__v  -_id')
        .exec((err, allList) => {
            if (err) {
                logger.error("Error finding previous list", "list.js:findAllList", 10)
                let apiResponse = response.generate(true, "Error fetching previous list", 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(allList)) {
                logger.error("No Previous list found", "list.js:findAllList", 5)
                let apiResponse = response.generate(true, "Error fetching previous list-No List", 404, null)
                res.send(apiResponse)
            } else {
                logger.info("Previous list found", "list.js:findAllList", 10)
                let apiResponse = response.generate(false, "Previous list found", 200, allList)
                res.send(apiResponse)
            }
        })
}

//function to find lists of a particular user with userId
let findUserList = (req, res) => {
    ListModel.find({
            'createdBy': req.params.userId
        })
        .select('-__v  -_id')
        .skip(parseInt(req.query.skip) || 0)
        .limit(5)
        .exec((err, fetchedList) => {
            if (err) {
                logger.error("Error finding previous list", "list.js:findUserList", 10)
                let apiResponse = response.generate(true, "Error fetching previous list", 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(fetchedList)) {
                logger.error("No Previous list found", "list.js:findUserList", 5)
                let apiResponse = response.generate(true, "Error fetching previous list", 404, null)
                res.send(apiResponse)
            } else {
                ListModel.count({ 'createdBy': req.params.userId }, (err, result) => {
                    const newObj = {
                        fetchedList: fetchedList,
                        totalItems: result
                    };
                    logger.info("Previous list found", "list.js:findUserList", 10)
                    let apiResponse = response.generate(false, "Previous list found", 200, newObj)
                    res.send(apiResponse)
                })
            }
        })
}

//function t0 delete a single user list
let deleteUserList = (req, res) => {

    let deleteListWithListid = () => {
        return new Promise((resolve, reject) => {
            if (!req.params.listId) {
                let apiResponse = response.generate(true, "list id not fetched/found", 404, null)
                reject(apiResponse)
            } else {
                ListModel.findOneAndDelete({
                        listId: req.params.listId
                    },
                    (err, fetchedList) => {
                        if (err) {
                            logger.error(`error fetching list with listId:${err}`, 'list.js;deleteuserlist', 8)
                            let apiResponse = response.generate(true, 'error fetching list with listId', 500, null)
                            reject(apiResponse)
                        } else {
                            fetchedListJsObj = fetchedList.toObject()
                            resolve(fetchedList)
                        }
                    }
                )
            }
        })
    }
    deleteListWithListid(req, res)
        .then((resolve) => {
            let apiResponse = response.generate(false, "todo list deleted succesfully", 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })

        .catch((err) => {
            console.log(err)
            res.status(err.status)
            res.send(err)
        })
} //end delete list func

//find a particular list with listId
let findListWithListId = (req, res) => {
    ListModel.findOne({
            'listId': req.params.listId
        })
        .select('-__v -_id')
        .lean()
        .exec((err, singleList) => {
            if (err) {
                logger.error(`${err}`, 'list.js:findlistwithlistid', 8)
                let apiResponse = response.generate(true, "Error Getting list with listId", 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(singleList)) {
                logger.error("No list with given listId found", 'list.js:findlistwithlistid', 10)
                let apiResponse = response.generate(true, "No list with given listId", 404, null)
                res.send(apiResponse)

            } else {
                logger.info("List Found", 'list.js:findlistwithlistid', 10)
                let apiResponse = response.generate(false, "List found with given listId", 200, singleList)
                res.send(apiResponse)
            }
        })
}

//function to create a new list
let createNewList = (req, res) => {
    let newList = () => {
        return new Promise((resolve, reject) => {
            if (req.body.listTitle) {

                let newList = new ListModel({
                    listId: shortid.generate(),
                    createdBy: req.params.userId,
                    listTitle: req.body.listTitle,
                    children: [],
                    createdOn: time.now()
                })
                newList.save((err, newList) => {
                    if (err) {
                        logger.error(err + "Error Creating new todo list", "list.js:newList", 10)
                        let apiResponse = response.generate(true, "Error Creating new todo list" + err, 500, null)
                        reject(apiResponse)
                    } else {
                        logger.info("New todo created success", "list.js:newList", 10)
                        //converting mongoose to js object
                        let newListObject = newList.toObject()
                        resolve(newListObject)
                    }
                })

            } else {
                let apiResponse = response.generate(true, "No list title body param found", 404, null)
                reject(apiResponse)
            }
        }) //end promise
    }
    newList(req, res)
        .then((resolve) => {
            let apiResponse = response.generate(false, "New To-Do list created success", 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err)
            res.status(err.status)
            res.send(err)
        })


} //end createNewList

//function to add item/to-do task to particular list
let addItem = (req, res) => {
    //item object
    let findList = () => {
        return new Promise((resolve, reject) => {
            if (req.params.listId) {
                ListModel.findOne({
                    'listId': req.params.listId
                }, ((err, foundList) => {
                    if (err) {
                        logger.error(`${err}`, 'list.js:findList()', 8)
                        let apiResponse = response.generate(true, "Error fetching list", 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(foundList)) {
                        logger.error(`${err}`, 'list.js:listFound', 8)
                        let apiResponse = response.generate(true, 'No list with given listid present', null)
                        reject(apiResponse)
                    } else {
                        resolve(foundList)
                    }
                }))
            } else {
                logger.error("list id is missing ", 'list.js"findLIst', 10)
                let apiResponse = response.generate(true, "List id is missing in params", null)
                reject(apiResponse)
            }
        }) //end promise
    } //end findList

    let addItemToList = (foundList) => {
        return new Promise((resolve, reject) => {
            let toDoItemObj = {
                itemName: req.body.itemName,
                itemId: shortid.generate(),
                createdOn: time.now(),
                children: [],
                createdBy: req.body.createdBy,
                isCompleted: false
            }
            //assigning children array in ListModel
            let childrenArray = foundList.children
            //pushing obj to childrenArray
            childrenArray.push(toDoItemObj)
            //supplying value to hildren in ListModel
            foundList.children = childrenArray
            foundList.markModified('children')
            foundList.save((err, ListWithItem) => {
                if (err) {
                    console.log(err)
                    logger.error(`${err} Error add item`, 'list.js:additemtolist', 10)
                    let apiResponse = response.generate(true, 'Error while adding item object to list', null)
                    reject(apiResponse)
                } else {
                    ListWithItemJsObj = ListWithItem.toObject()
                    resolve(ListWithItemJsObj)
                }
            })
        }) //end promise
    } //end addItemToList

    findList(req, res)
        .then(addItemToList)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'ToDo item added to list successfully', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })

        //gobal promise error catch handler
        .catch((err) => {
            console.log(err);
            res.status(err.status)
            res.send(err);
        })

} //end addItem

//function to add child items
let addChildItem = (req, res) => {
    let findList = () => {
        return new Promise((resolve, reject) => {
            if (req.params.listId) {
                ListModel.findOne({
                    'listId': req.params.listId,
                    'children.itemId': req.params.itemId
                }, ((err, foundList) => {
                    if (err) {
                        logger.error(`${err}`, 'list.js:findList()', 8)
                        let apiResponse = response.generate(true, "Error fetching list", 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(foundList)) {
                        logger.error(`${err}`, 'list.js:listFound', 8)
                        let apiResponse = response.generate(true, 'No list with given listid present', null)
                        reject(apiResponse)
                    } else {
                        resolve(foundList)
                    }
                }))
            } else {
                logger.error("list id is missing ", 'list.js"findLIst', 10)
                let apiResponse = response.generate(true, "List id is missing in params", null)
                reject(apiResponse)
            }
        }) //end promise
    } //end findList

    let addSubItemToList = (foundList) => {
        return new Promise((resolve, reject) => {
            let toDoItemObj = {
                subItemName: req.body.subItemName,
                subItemId: shortid.generate(),
                createdOn: time.now(),
                isCompleted: false
            }

            //find childitem array(children) with given Item id and //assigning to subChildrenArr
            subChildrenArr = foundList.children.find(x => x.itemId === req.params.itemId).children;
            subChildrenArr.push(toDoItemObj)
            //pushing obj to subChildrenArray

            //supplying value to item's children in ListModel
            foundList.children.find(x => x.itemId === req.params.itemId).children = subChildrenArr
            foundList.markModified('children')
            foundList.save((err, ListWithsubItem) => {
                if (err) {
                    console.log(err)
                    logger.error(`${err} Error add item`, 'list.js:additemtolist', 10)
                    let apiResponse = response.generate(true, 'Error while adding child/sub item object to list', null)
                    reject(apiResponse)
                } else {
                    ListWithsubItemJsObj = ListWithsubItem.toObject()
                    resolve(ListWithsubItemJsObj)
                }
            })
        }) //end promise
    } //end addSubItemToList

    findList(req, res)
        .then(addSubItemToList)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'ToDo sub/child item added to list successfully', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })

        //gobal promise error catch handler
        .catch((err) => {
            console.log(err);
            res.status(err.status)
            res.send(err);
        })

} //end addChildItem

//function to edit item
let editItem = (req, res) => {
    //param validation
    if (check.isEmpty(req.params.listId) && check.isEmpty(req.params.itemId)) {

        console.log('listId and itemId should be passed')
        let apiResponse = response.generate(true, 'listId and itemId is missing', 403, null)
        res.send(apiResponse)
    } else {
        //update name item name
        ListModel.updateOne({
                'listId': req.params.listId,
                'children.itemId': req.params.itemId //find children with item id got via req param
            }, {
                $set: { //'arrayName.$.field'
                    "children.$.itemName": req.body.itemName //modify array element by editing itemNAme
                }
            },
            (err, updatedList) => {
                if (err) {
                    logger.error(`${err}:Unable to update Item`, 'List.js:editItem', 10)
                    let apiResponse = response.generate(true, "Unable to edit item in list", 500, null)
                    res.send(apiResponse)
                } else {
                    logger.info(updatedList, 'list.js:foundlist', 10)
                    let apiResponse = response.generate(false, 'Item Updated Successfully in List', 200, updatedList)
                    res.send(apiResponse)
                }
            })
    }
}

//function to delete an item/to-do task from a particular list
let deleteItem = (req, res) => {
    //param validation
    if (check.isEmpty(req.params.listId) && check.isEmpty(req.params.itemId)) {

        console.log('listId and itemId should be passed')
        let apiResponse = response.generate(true, 'listId and itemId is missing', 403, null)
        res.send(apiResponse)
    } else {
        //update name item name
        ListModel.updateOne({
                'listId': req.params.listId,
                'children.itemId': req.params.itemId //find children with item id got via req param
            }, {
                $pull: //{arrayNAme:{arrayField:value}}
                {
                    children: {
                        itemId: req.params.itemId
                    }
                } //delete array object matching itemId.

            },
            (err, updatedList) => {
                if (err) {
                    logger.error(`${err}:Unable to delete Item`, 'List.js:editSubItem', 10)
                    let apiResponse = response.generate(true, "Unable to delete item in list", 500, null)
                    res.send(apiResponse)
                } else {
                    logger.info(updatedList, 'list.js:updatedlist', 10)
                    let apiResponse = response.generate(false, 'Item Deleted Successfully from the list', 200, updatedList)
                    res.send(apiResponse)
                }
            })
    }
} //end delete item

let editSubItem = (req, res) => {
    //param validation
    if (check.isEmpty(req.params.listId) && check.isEmpty(req.params.itemId) && check.isEmpty(req.params.subItemId)) {

        console.log('listId and itemId should be passed')
        let apiResponse = response.generate(true, 'listId/itemId/subItemId is missing', 403, null)
        res.send(apiResponse)
    } else {
        ListModel.findOneAndUpdate({
                'listId': req.params.listId,
                'children.itemId': req.params.itemId,
                'children.children.subItemId': req.params.subItemId
            }, {
                $set: {
                    'children.children.$.subItemName': req.body.subItemName
                    // 'children.children.$.subItemName': req.body.subItemName
                }
            },

            (err, updatedList) => {
                if (err) {
                    logger.error(`${err}:Unable to edit subItem`, 'List.js:editSubItem', 10)
                    let apiResponse = response.generate(true, "Unable to edit subitem in list", 500, null)
                    res.send(apiResponse)
                } else {
                    logger.info(updatedList, "List.js:editSubItem", 10)
                    let apiResponse = response.generate(false, 'Sub Item Updated Successfully in the list', 200, updatedList)
                    res.send(apiResponse)
                }

            }
        ) //end updateFunction
    }
} //end editSubItem

let deleteSubItem = (req, res) => {
    //param validation
    if (check.isEmpty(req.params.listId) && check.isEmpty(req.params.itemId)) {

        console.log('listId and itemId should be passed')
        let apiResponse = response.generate(true, 'listId and itemId is missing', 403, null)
        res.send(apiResponse)
    } else {
        ListModel.updateOne({
            'listId': req.params.listId,
            'children.itemId': req.params.itemId,
            'children.children.subItemId': req.params.subItemId
        }, {
            $pull: { //'arrayname':{arrayfield}
                'children.$.children': {
                    subItemId: req.params.subItemId
                }
            }
        }, (err, updatedList) => {
            if (err) {
                logger.error(`${err}:Unable to delete subItem`, 'List.js:editSubItem', 10)
                let apiResponse = response.generate(true, "Unable to delete subitem from list", 500, null)
                res.send(apiResponse)
            } else {
                logger.info(updatedList, "List.js:editSubItem", 10)
                let apiResponse = response.generate(false, 'Sub Item Deleted Successfully from the list', 200, updatedList)
                res.send(apiResponse)
            }

        })
    }
}


// method to check is item todo completed
let isCompleted = (req, res) => {

    ListModel.updateOne({
            'listId': req.params.listId,
            'children.itemId': req.params.itemId
        }, {
            $set: { //'arrayName.$.field'
                "children.$.isCompleted": req.body.isCompleted //modify array element by editing isCompleted boolean value
            }
        },
        (err, updatedList) => {
            if (err) {
                logger.error(`${err}`, 'list.js:isCompleted()', 8)
                let apiResponse = response.generate(true, `Error updating list ${err}`, 500, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, "isCompleted updated", 200, updatedList)
                res.send(apiResponse)
            }
        }
    )
}

module.exports = {
    allList: findAllList,
    fetchedList: findUserList,
    deleteUserList: deleteUserList,
    findListWithListId: findListWithListId,
    createNewList: createNewList,
    addItem: addItem,
    addchild: addChildItem,
    editItem: editItem,
    editSubItem: editSubItem,
    deleteItem: deleteItem,
    deletSubItem: deleteSubItem,
    isCompleted: isCompleted
}