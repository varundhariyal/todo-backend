const express = require('express')
const events = require('events')
const eventEmitter = new events.EventEmitter() //new eventEmitter instance
const socketio = require('socket.io')
const shortid = require('shortid')
const response = require('./response')
const logger = require('./loggerLib')
const mongoose = require('mongoose')
const tokenLib = require('./tokenLib')
const check = require('./checkLib')


//here server is http server initialized in app.js
let setServer = (server) => {

    //socket initialization
    let io = socketio.listen(server)
    let myIo = io.of('') //no namespace

    //main event handler,inside this series of events can be handled
    myIo.on('connection', (socket) => {
        console.log("on connection success => emitting verify user");
        socket.emit("verifyUser", ""); //event emit=>listening on frontend

        //to set user via verifying authToken received via verifyUser event
        //event set-user listening emitted on frontend
        socket.on('set-user', (authToken) => {
            console.log("set-user called")
            if (check.isEmpty(authToken)) {
                console.log('Empty authToken')
            } else {
                tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {
                    if (err) {
                        socket.emit('auth-error', {
                            status: 500,
                            error: 'Please provide correct auth token'
                        })
                    } else {

                        console.log("user is verified..setting details");
                        let currentUser = user.data;
                        console.log(currentUser)
                        // setting socket user id 
                        socket.userId = currentUser.userId
                        let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                        let key = currentUser.userId
                        let value = fullName

                    }
                })
            }
        })
    })
    // end of listening set-user event
}


module.exports = {
    setServer: setServer
}