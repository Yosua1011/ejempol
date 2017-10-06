const jwt = require('jsonwebtoken')
// const Todo = require('../models/Todo')
require('dotenv').config()
const env = process.env.NODE_ENV || "development"

const isUserAuth = (req,res,next) => {
    if(req._id == req.params.id) {
        next()
    } else {
        res.send('Kamu tidak berhak mengakses data orang lain')
    }
}

const isUserAuthTodo = (req,res,next) => {
    if(req._id == req.params.userId) {
        next()
    } else {
        res.send('Kamu tidak berhak mengakses data orang lain')
    }
}

const isAuthtoEditDelete = (req,res,next) => {
    Todo.findById({
        _id: req.params.todosId
    })
    .then(todo => {
        if(todo.userId == req._id) {
            next()
        } else {
            res.send('Access Denied: You are not authorized!')
        }
    })
    .catch(err => res.send(err))
}



module.exports = {
    isUserAuth,
    isUserAuthTodo,
    isAuthtoEditDelete
}
