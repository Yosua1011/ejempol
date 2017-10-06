const jwt = require('jsonwebtoken')
// const Todo = require('../models/Todo')
require('dotenv').config()
const env = process.env.NODE_ENV || "development"

const isLogin = (req,res,next) => {
    if(req.headers.token !== null) {
        jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
            console.log('ini decoded',decoded)
            if (err) {
                res.send(err)
            } else {
                req._id = decoded._id
                next()
            }
        })
    } else {
        res.send({msg: 'Please Login First'})
    }
}

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
    isLogin,
    isUserAuth,
    isUserAuthTodo,
    isAuthtoEditDelete
}
