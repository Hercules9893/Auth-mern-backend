const express = require('express');
const Profile = require('../Controller/User/Profile/Profile');
const Register = require("../Controller/User/Register/register");
const Login = require('../Controller/User/Login/login');
const authenticationToken = require('../middleware/verifytoken');
const router = express.Router();

router.get("/profile",authenticationToken, Profile);
router.post("/login", Login);
router.post("/register", Register);

module.exports = router;