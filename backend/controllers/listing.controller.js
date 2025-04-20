const { default: mongoose } = require('mongoose')
const List = require('./../models/Listings.js')

//add a listing
async function addList(req, res){
    try{
        let newList = req.body
        newList.itemImage = req.file.filename
        newList.status = 'active'
        newList.user = req.user.id
        let data = await List.create(newList)
        res.status(201).send(data)
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}
//Retrieve all the listings
async function getAllList(req, res){
    try {
        let lists = await List.find().populate("user", "-password")
        let modLists = lists.map(list=>(
            {
                ...list.toObject(),
                itemImage:process.env.IMAGE_URL+list.itemImage
            }
        ))
        res.status(200).send(modLists)
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}

//Retrieve list by Id
const getListById = async (req, res) => {
    try {
        let { id } = req.params

        let list = await List.findOne({_id: id}).populate("user", "-password");
        let modList =  {
            ...list.toObject(),
            itemImage: process.env.IMAGE_URL+list.itemImage
        }
        res.status(200).send(modList)
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
};

const getCurrentUserLists = async(req, res)=> {
    try {
        let userId = req.user.id
        userId = new mongoose.Types.ObjectId(userId)    //error
        let lists = await List.find({user: userId}).populate("user", "-password")
        let modLists = lists.map( list  => (
            {
                ...list.toObject(),
                itemImage: process.env.IMAGE_URL+list.itemImage
            }
        ))
        res.status(200).send(modLists)
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}

//Update List details without image
async function updateList(req, res){
    try {
        let { id } = req.params
        let existingList = await List.findById(id);
        if(existingList){
            if(existingList.user.toString() !== req.user.id){
                return res.status(401).send({message: "You are not authorized to update this event."})
            }
        } else {
            return res.status(404).send({message: "Invalid Item Id"})
        }
        let list = req.body
        list = await List.findByIdAndUpdate({_id: id}, list, {new: true}).populate("user", "-password");
        let modList =  {
            ...list.toObject(),
            itemImage: process.env.IMAGE_URL+list.itemImage
        }
        res.status(200).send(modList)
    } catch (error) {
        console.log(error)
        res.status(400).send({"message": error.message})
    }
}
//Update List image based on ID.
const updateListImage = async (req, res) => {
    try {
        let { id } = req.params
        let fileName = req.file.filename
        let lists = await List.findOneAndUpdate({_id: id}, {itemImage: fileName}, {new: true})
        res.status(200).send(lists)
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}

//Delete list details
async function deleteList(req, res){
    try{
        let { id } = req.params
        let lists = await List.findOneAndDelete({_id: id})
        if(lists){
            res.status(200).send(lists)
        } else {
            res.status(404).send({"message": "Invalid id"})
        }
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}

//Search Engine
const searchByTitle = async (req, res) => {
    const { title } = req.query;
  
    if (!title) {
      return res.status(400).json({ message: 'Title query parameter is required' });
    }
  
    try {
      console.log("Searching for:", title); 
  
      const lists = await List.find({
        title: { $regex: title, $options: 'i' },
      }).populate("user", "-password");
  
      if (lists.length === 0) {
        return res.status(404).json({ message: 'No items found with the given title' });
      }
  
      let modLists = lists.map(list => ({
        ...list.toObject(),
        itemImage: process.env.IMAGE_URL + list.itemImage
      }));
  
      res.status(200).send(modLists);
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

module.exports = {
	addList,
	getAllList,
	getListById,
	updateList,
	updateListImage,
	deleteList,
    searchByTitle,
    getCurrentUserLists
    }