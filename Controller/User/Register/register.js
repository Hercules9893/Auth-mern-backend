const usertable = require("../../../models/usertable.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = "12345678910";
const Register = async (req, res) => {
    console.log("api check", req.body);
    try {
        const { fullname, email, mobile, password } = req.body;


        if (!fullname || !email || !mobile || !password) {
            return res.status(400).json({ status: "failed", error: "All fields are required" });
        }

        const salt = await bcrypt.genSalt(10);
        const bcrypt_password = await bcrypt.hash(password, salt);

        const createuser = new usertable({
            fullname,
            email,
            mobile,
            password: bcrypt_password,
        });

        const response = await createuser.save();
        const token = jwt.sign({ id: response.id }, secretKey, { expiresIn: "1h" });

    } catch (error) {
        res.send({ status: "failed", errors: error.message });
        console.log("erroe check", error);
    }
}

module.exports = Register;