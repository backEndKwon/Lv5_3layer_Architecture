const express = require("express");
const router = express.Router();

const UserController = require("../controllers/users.controller")
const userController = new UserController();

//회원가입api
router.post("/signup",userController.signup);
//로그인api
router.post("/login",userController.login);



module.exports = router;
