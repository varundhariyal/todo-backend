const mongoose = require('mongoose');
const passwordLib = require('../libs/generatePasswordLib');
const validateInput = require('../libs/paramsValidationLib');
const time = require('../libs/timeLib');
const check = require('../libs/checkLib');
const token = require('../libs/tokenLib');
const logger = require('../libs/loggerLib');
const shortid = require('shortid')
const response = require('../libs/response');
//Models
const SignupModel = require('../model/Signup');
const FriendModel = require('../model/Friend')
const AuthModel = require('../model/Auth')

let getAllUser = (req, res) => {
    SignupModel.find()
        .select(' -__v -_id -Password')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller: getAllUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
} // end get all users

//SignUp Function
let userSignup = (req, res) => {

    //validateUserInput
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.Email) {
                if (!validateInput.Email(req.body.Email)) {
                    let apiResponse = response.generate(true, "Email does not meet requirement", 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.Password)) {
                    let apiResponse = response.generate(true, "Password Field/Parameter is empty", 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else { //when email etc are missing fields then
                logger.error("Field missing during user creation", "controller:validateUserInput", 5)
                let apiResponse = response.generate(true, "One or More Field Missing", 400, null)
                reject(apiResponse)
            }
        }) //end promise
    } //end validateUserInput

    let createUser = () => {
        return new Promise((resolve, reject) => {
            SignupModel.findOne({
                    Email: req.body.Email //find whether person with email id already exist
                })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, "controller:createUser", 10)
                        let apiResponse = response.generate(true, "Failed to create user", 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body)
                        let newUser = new SignupModel({
                            userId: shortid.generate(),
                            FirstName: req.body.FirstName,
                            LastName: req.body.LastName,
                            Email: req.body.Email.toLowerCase(),
                            CountryCode: req.body.CountryCode,
                            MobileNumber: req.body.MobileNumber,
                            Password: passwordLib.hashpassword(req.body.Password),
                            CreatedOn: time.now()
                        })
                        //save newUser
                        newUser.save((err, newUser) => {
                            if (err) {
                                logger.error(err.message, "controller:newUser", 10)
                                let apiResponse = response.generate(true, "Failed to create a new user", 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserJsObect = newUser.toObject()
                                resolve(newUserJsObect)
                            }
                        })
                    } else {
                        logger.error("User already present with given email id", "controller:CreateUser", 10)
                        let apiResponse = response.generate(true, "user already present with given email id", 403, null)
                        reject(apiResponse)
                    }
                }) //end callback
        }) //end promise
    } //end createUser
    //process flow
    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.Password
            let apiResponse = response.generate(false, 'User created', 200, resolve)
            res.send(apiResponse)
        })
        //gobal promise error catch handler
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

} //end userSignup function

//function to update/reset password
let updatePassword = (req, res) => {
    let newPasswordObject = {
        Email: req.body.Email,
        Password: passwordLib.hashpassword(req.body.Password)
    }
    SignupModel.updateOne({
            Email: req.body.Email
        }, newPasswordObject)
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, "controller:updatePassword", 10)
                let apiResponse = response.generate(true, "Error reseting password", 400, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, "Email id not valid", 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, "User Password Changed Success", 200, result)
                res.send(apiResponse)
            }
        })
} //end updatepassword

//userLogin function

let userLogin = (req, res) => {
    //finding existing user by querying the database using(emailid)
    let findUser = () => {

        return new Promise((resolve, reject) => {
            if (req.body.Email) {
                SignupModel.findOne({
                    Email: req.body.Email
                }, (err, userDetail) => {
                    if (err) {
                        logger.error("Failed to get user data", "controller:finduser", 10)
                        let apiResponse = response.generate(true, "Failed to retrieve user data", 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetail)) {
                        logger.error('No User Found', 'controller: findUser', 8)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        logger.info("user found success", "controler:finduser", 10)
                        resolve(userDetail)
                        //this resolve param will be supplied to next function's param
                    }
                });
            }
            //if req.body.Email is empty/not fetched
            else {
                logger.error("Email Field missing", "controller:finduser", 7)
                let apiResponse = response.generate(true, "Email param/field is missing", 400, null)
                reject(apiResponse)
            }
        }) //end promise
    } //end findUser()
    //here retrievedUserDetails is userDetail which we got from last resolve in findUser()
    let validatePassword = (retrievedUserDetails) => {
        console.log('Validating User Entered Password')
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.Password, retrievedUserDetails.Password, (err, passwordMatch) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'controller: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (passwordMatch) {
                    //   converting mongoose object to js object
                    let retrievedUserDetailsJsObject = retrievedUserDetails.toObject()
                    //delete password from api response
                    delete retrievedUserDetailsJsObject.Password
                    delete retrievedUserDetailsJsObject._id
                    delete retrievedUserDetailsJsObject.__v
                    delete retrievedUserDetailsJsObject.createdOn
                    delete retrievedUserDetailsJsObject.modifiedOn
                    resolve(retrievedUserDetailsJsObject) //this resolve param will act as param for next function inline
                } else {
                    logger.info('Login Failed Invalid Password', 'controller: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password->Login Failed', 400, null)
                    reject(apiResponse)
                }
            })

        }) //end promise
    } //end validate password
    //once password validation is over,provide/generate jwt access token

    let generateToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, "Error generating token", 400, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        }) //end promise
    } //end generate token

    let saveToken = (tokenDetails) => {
        console.log("save token");
        return new Promise((resolve, reject) => {
            AuthModel.findOne({
                userId: tokenDetails.userId
            }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }
    //end savetoken

    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, "User Login Success", 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })

        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
} //end userLogin

//logout function
let logout = (req, res) => {
    AuthModel.findOneAndRemove({
            userId: req.user.userId
        },
        ((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, "controller:logout", 10)
                let apiResponse = response.generate(true, "Error Occured", 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, "User already logged out/invalid userID", 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, "Logout success", 200, result)
                res.send(apiResponse)
            }
        }) //end callback

    )
} //end logout

//friend request functions 
let sendFriendRequest = (req, res) => {

    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.senderId)) {
                logger.error('User id is missing in the request', 'userController : sendFriendRequestFunction => validateInput()', 10);
                let apiResponse = response.generate(true, 'User id is missing in the request', 404, null);
                reject(apiResponse);
            } else if (check.isEmpty(req.body.receiverId)) {
                logger.error('Sent to user id is missing in the request', 'userController : sendFriendRequestFunction => validateInput()', 10);
                let apiResponse = response.generate(true, 'User id is missing in the request', 404, null);
                reject(apiResponse);
            } else {
                resolve(req);
            }
        }); //end of promise
    }; //end of validateInput function

    let validateUserId = () => {
        return new Promise((resolve, reject) => {
            SignupModel.findOne({
                    userId: req.body.senderId
                })
                .exec((err, result) => {
                    if (err) {
                        logger.error(err.message, 'userController : sendFriendRequestFunction => validateUserId()', 10);
                        let apiResponse = response.generate(true, err.message, 500, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        logger.error('Sending User data not found', 'userController : sendFriendRequestFunction => validateUserId()', 10);
                        let apiResponse = response.generate(true, 'Sending User data not found', 204, null);
                        reject(apiResponse);
                    } else {
                        SignupModel.findOne({
                                userId: req.body.receiverId
                            })
                            .exec((err, result) => {
                                if (err) {
                                    logger.error(err.message, 'userController : sendFriendRequestFunction => validateUserId()', 10);
                                    let apiResponse = response.generate(true, err.message, 500, null);
                                    reject(apiResponse);
                                } else if (check.isEmpty(result)) {
                                    logger.error('Sent to User data not found', 'userController : sendFriendRequestFunction => validateUserId()', 10);
                                    let apiResponse = response.generate(true, 'Sent to User data not found', 204, null);
                                    reject(apiResponse);
                                } else {
                                    resolve(req);
                                }
                            });
                    }
                });
        }); //end of promise
    }; //end of validateUserId function

    //saveFriendRequest
    let saveFriendRequest = () => {
        return new Promise((resolve, reject) => {
            let FriendRequestObj = new FriendModel({
                senderId: req.body.senderId,
                receiverId: req.body.receiverId,
                sentOn: time.now(),
                status: "Pending"
            })
            FriendRequestObj.save((err, result) => {
                if (err) {
                    logger.error(err.message, 'userController : sendFriendRequestFunction => saveFriendRequest()', 10);
                    let apiResponse = response.generate(true, 'Unable to send friend request' + err.message, 500, null);
                    reject(apiResponse);
                } else {
                    FriendRequestJsObj = result.toObject()
                    resolve(FriendRequestJsObj)
                }
            })
        })
    } //end save friend request
    validateInput(req, res)
        .then(validateUserId)
        .then(saveFriendRequest)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Friend Request sent to the user', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })

        .catch((err) => {
            //console.log('error handler');
            //console.log(err);
            res.status(err.status);
            res.send(err);
        });

} //end send friend request


//function to get all friend request from database
let getFriendRequest = (req, res) => {
    FriendModel.find({
            'senderId': req.body.senderId
        },
        (err, result) => {
            if (err) {
                logger.error(`${err}`, 'user.js:getFriendRequest()', 7)
                let apiResponse = response.generate(true, `Internal server error ${err}`, 500, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, `Friend Request Found Success`, 200, result)
                res.send(apiResponse)
            }
        }
    )
}


//function to get friend request with particular recieverId
let getFriendRequestWithReceiverId = (req, res) => {
    console.log(req.params)
    FriendModel.find({
            'receiverId': req.params.receiverId
        }).populate({ //provide value
            path: 'senderData',
            select: 'userId FirstName LastName'
        })
        .exec((err, result) => {
            if (err) {
                logger.error(`${err}`, 'user.js:getFriendRequestWithReceiverId', 7)
                let apiResponse = response.generate(true, `${err}Error fetching friend request`, 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, `No Friend Request found`, 404, null)
                res.send(apiResponse)
            } else {
                logger.info(result, 'Friend Request found', 10);
                let apiResponse = response.generate(false, `Friend request found for receiver Id`, 200, result)
                res.send(apiResponse)
            }
        })
}

//function to accept friend request
let acceptFriendRequest = (req, res) => {
    let options = {
        status: req.body.status
    }
    FriendModel.updateOne({
            'receiverId': req.params.receiverId,
            'senderId':req.params.senderId
        },  options)
        // .populate({
        //     path: 'senderData',
        //     select: 'FirstName LastName'
        // })
        .exec((err, result) => {
            if (err) {
                logger.error(`${err}`, 'user.js:acceptFriendRequest', 7)
                let apiResponse = response.generate(true, `${err}Error accepting friend request`, 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, `No Friend Request to update`, 404, null)
                res.send(apiResponse)
            } else {
                logger.info(result, 'Friend Request Aceepted', 10);
                let apiResponse = response.generate(false, `Friend request accepted succesfully`, 200, result)
                res.send(apiResponse)
            }
        })
}


//function to delete a friend request
let deleteFriendRequest = (req, res) => {
    FriendModel.remove({
            'senderId': req.params.senderId
        },
        (err, result) => {
            if (err) {
                logger.error(`${err}`, 'user.js:deleteFriendRequest', 7)
                let apiResponse = response.generate(true, `${err}Error deleting friend request`, 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, `No friend request found matching senderId`, 404, null)
                res.send(apiResponse)
            } else {
                logger.info(result, 'Friend Request deleted', 10);
                let apiResponse = response.generate(false, `Friend request successfully deleted`, 200, result)
                res.send(apiResponse)
            }
        }
    )
}

module.exports = {
    getAllUser: getAllUser,
    signup: userSignup,
    updatepassword: updatePassword,
    login: userLogin,
    logout: logout,
    sendFriendRequest: sendFriendRequest,
    getFriendRequestWithReceiverId: getFriendRequestWithReceiverId,
    acceptFriendRequest: acceptFriendRequest,
    deleteFriendRequest: deleteFriendRequest
}