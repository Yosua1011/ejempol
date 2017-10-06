const FB = require('fb')
const User = require('../models/User')
const ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')
require('dotenv').config()
const env = process.env.NODE_ENV || "development"
var bcrypt = require('bcryptjs')

module.exports = {
    findAllUsers: function(req, res) {
        User.find()
        .then(data_users => {res.send(data_users)})
        .catch(err => res.send(err))
      },

    findSpecificUser: function(req, res) {
        User.findById(req.params.id)
        .then(data_user => {res.send(data_user)})
        .catch(err => res.send(err))
    },

    deleteSpecificUser: function(req, res) {
        User.remove({
            _id: req.params.id
        })
        .then(userDeleted => {
            res.send(`User deleted`)
        })
        .catch(err => {
            res.send(err)
        })
    },

    editSpecificUser: function(req, res) {
        User.findOneAndUpdate({
            _id: req.params.id
        }, {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            res.send(`User sudah terupdate`)
        })
        .catch(err => {
            res.send(err)
        })
    },

    // registerNewUser: function(req,res) {
    //     const password = req.body.password
    //     bcrypt.genSalt(10, (errSalt, salt) => {
    //         bcrypt.hash(password, salt, (errHash, hash) => {
    //             User.create({
    //                 username: req.body.username,
    //                 email: req.body.email,
    //                 password: hash
    //             })
    //             .then(() => {
    //                 res.send({msg: `success to register`})
    //             })
    //             .catch(err => {
    //                 return res.status(400).send({msg: err.message})
    //             })
    //         })
    //     })
    // },

    setFBAccessToken: (req, res, next) => {
        FB.setAccessToken(req.headers.fbaccesstoken);
        next()
    },

    loginUser: function(req,res) {
        User.find({facebookId: req.headers.fbid})
        .then(user => {

            if (user == false) {
                FB.api('/me', response => {
                    User.create({
                        facebookId: response.id,
                        name: response.name
                    })
                    .then(createdUser => {
                        console.log('this is createdUser' + createdUser)
                        const token = jwt.sign({
                            _id: createdUser._id,
                            name: createdUser.name
                        }, process.env.JWT_SECRET)
                        res.send(token)
                    })
                    .catch(err => res.send(err))
                })
            } else {
                console.log('this is user ' + user)
                const token = jwt.sign({
                    _id: user[0]._id,
                    name: user[0].name
                }, process.env.JWT_SECRET)
                // res.send(token)
                res.send({token: token, name: user[0].name, userid: user[0]._id})
            }
        })
        .catch(err => res.send(err))

    },

    // loginUser: function(req,res) {
    //     const username = req.body.username
    //     const password = req.body.password
    //     if(!req.body.username || !req.body.password) {
    //         res.status(401).send({msg: 'Please Insert Username and Password'})
    //     } else {
    //         User.findOne({username: req.body.username})
    //         .then(user => {
    //             bcrypt.compare(password, user.password)
    //             .then(bcryptResult => {
    //                 if(bcryptResult) {
    //                     const token=jwt.sign({id: user._id, username:user.username}, process.env.JWT_SECRET)
    //                     res.send(token)
    //                 }
    //             })
    //         })
    //         .catch(err => {
    //             res.status(401).send({msg: 'Username not found'})
    //         })
    //     }
    // },

    // logoutUser: function(req,res) {
    //     req.session.destroy()
    //     res.send('User telah logout')
    // }

    getUser: (req, res) => {
        FB.api('/me', response => {
          res.send(response)
        })
      }
}
