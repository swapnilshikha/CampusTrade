const express = require('express')

const {
    adduser,
    getAllUsers,
    getUserById,
    //getUser,
    updateUser,
    deleteUser,
    login
} = require('./../controllers/user.controller.js')

const userRouter = express.Router()

userRouter.post("", adduser)
userRouter.get("/", getAllUsers)
userRouter.get("/:id",getUserById)
//userRouter.get("/sic/:id", getUser)  
userRouter.put('/:id',  updateUser)
userRouter.delete('/:id', deleteUser)
userRouter.post("/login", login)

module.exports = userRouter