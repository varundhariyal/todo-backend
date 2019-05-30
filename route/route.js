const express = require('express');
const router = express.Router();
const userController = require("../controllers/user");
const listController = require('../controllers/singleTodo')
const sendMail = require('../controllers/mail')
const appConfig = require("../config/appConfig")
const auth = require('../midlleware/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    app.post(`${baseUrl}/login`, userController.login);

    app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);

    app.get(`${baseUrl}/all`, userController.getAllUser);
    app.get(`${baseUrl}/getallusers`, userController.getAllUser)
    app.post(`${baseUrl}/sendMail`, sendMail.sendMail)

    // params: userId.
    app.post(`${baseUrl}/update`, userController.updatepassword);


    // params: firstName, lastName, email, mobileNumber, password, apiKey.
    app.post(`${baseUrl}/signup`, userController.signup);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "userId": "-E9zxTYA8"
            }

        }
    */

    //friend request sending
    app.post(`${baseUrl}/sendrequest`, userController.sendFriendRequest)
    //friend request display
    app.get(`${baseUrl}/friendrequest/:receiverId`, userController.getFriendRequestWithReceiverId)
    app.post(`${baseUrl}/acceptrequest/:receiverId/:senderId`, userController.acceptFriendRequest)
    app.post(`${baseUrl}/deleterequest/:senderId`, userController.deleteFriendRequest)

}