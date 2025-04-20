const express = require('express')

const {
    addList,
	getAllList,
	updateListImage,
	getListById,
	searchByTitle,
	updateList,
	deleteList,
	getCurrentUserLists
} = require('./../controllers/listing.controller.js')

const upload = require('./../middlewares/fileUpload.middleware.js')
const verifyToken = require('../midllewares/auth.middleware.js')

const ListRouter = express.Router()

ListRouter.post("/",verifyToken, upload.single('itemImage'), addList);
ListRouter.get("/", getAllList);

//ListRouter.get("/:id", getListById);
//ListRouter.get("/search", searchByTitle)
//This means the route /search will never be hit, because /:id will catch anything like /search and treat "search" as an ID.
ListRouter.get("/search", searchByTitle) // <-- Always above
eventRouter.get("/user", verifyToken, getCurrentUserLists) 
ListRouter.get("/:id", getListById); //<-- keep this below
ListRouter.put("/:id", updateList); 
ListRouter.put("/image/:id", verifyToken, upload.single('itemImage'), updateListImage); 
ListRouter.delete('/:id', verifyToken, deleteList);

module.exports = ListRouter