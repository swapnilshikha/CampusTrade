const jwt = require('jsonwebtoken')
const User = require('./../models/user.model.js')

//add new User
async function adduser(req, res) {
    try {
        let newUser = req.body;  // Extract user data
        let user = await User.create(newUser);  // Save to database
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
}

//Retrieve all Users
async function getAllUsers(req, res){
    try {
        let users = await User.find()
        //User.find() is a Mongoose query that retrieves all documents (users) from the MongoDB database.
        res.send(users)
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}

//retrieve user by id
async function getUserById(req, res){
    try {
        let { id } = req.params
        let users = await User.findOne({_id: id})  //_id is the database id of the user
        if(users){
            res.send(users)
        } else {
            res.status(404).send({"message": "Invalid id"})
        }
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}

//Retrieve a single user based on SIC/email/mobile
// async function getUser(req, res){
//     try {
//         let { sic, email, mobile } = req.params
//         let query = {};

//         if(sic)
//             query.sic = sic;
//         if(email)
//             query.email = email;
//         if(mobile)
//             query.mobile = mobile;

//         if(Object.keys(query).length === 0){
//             return res.status(400).send({"message": "Invalid query!"})
//         }

//         let user = await user.findOne({$or: [query]});

//         if(user){
//             res.send(user);
//         }else{
//             res.status(404).send({"message": "User not found"});
//         }
//     }
//     catch (error) {
//         res.status(400).send({"message": error.message});
//     }
// }

//Update a student based on SIC
async function updateUser(req, res){
    try{
        let user = req.body
        let { id } = req.params
        console.log(user)
        user = await User.findOneAndUpdate({_id: id}, user, {new: true})
        if(user){
            res.status(200).send(user)
        } else {
            res.status(404).send({"message": "Invalid id"})
        }
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}
//By default, findOneAndUpdate() returns the old document.
//new: true } ensures that the function returns the updated document instead.
//findOneAndUpdate({_id: id}, user, {new: true}) here, id ---> user criteria, user ---> updated data, {new: true} ---> return updated data

//Delete a student based on SIC 
async function deleteUser(req, res){
    try{
        let { id } = req.params
        let user = await User.findOneAndDelete({_id: id})
        if(user){
            res.status(200).send(user)
        } else {
            res.status(404).send({"message": "Invalid id"})
        }
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}

async function login(req, res) {
    try{ 
        let { email, password } = req.body
        let user = await User.findOne({email})
        if(user){
            if(user.password === password){
                let token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET)
                res.status(200).send({token: token, name: user.name})
            } else {
                res.status(400).send({message: "Invalid Credentails"})
            }
        } else {
            res.status(400).send({message: "Invalid Credentails"})
        }

    } catch(error) {
        res.status(500).send({message: "Server Error"})
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    adduser,
    updateUser,
    deleteUser,
    login
    // getUser
}