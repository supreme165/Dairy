const authGuard = require("../middleware/authguagrd");
const isAdmin= require("../middleware/isAdmin");

const{createUsers,updateUsers, deleteUsers, getAllUsers, findUsers, loginUsers} = require ("../controller/practicecontroller");

const fileUpload = require("../middleware/multer");
const express = require ("express").Router();

// express.post("/createUsers",createUsers);
express.get("/getallUsers",authGuard,isAdmin,getAllUsers);
express.put("/updateUsers",authGuard,fileUpload('image'), updateUsers);
express.post("/loginUsers", loginUsers);
express.delete("/deleteUsers/:id",authGuard, deleteUsers);
express.get("/findUsers/:id",findUsers);

express.post("/createUsers",fileUpload('image'),createUsers);

module.exports = express;
