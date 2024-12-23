const jswt = require('jsonwebtoken');
// In your registration or login controller
const usertable = require("../../../models/usertable.js");
const secretKey = "12345678910";
const bcrypt = require("bcryptjs");

const Login = async (req, res) => {
    console.log("api check", req.body);
    try {
        const { email, password } = req.body;
        const user = await usertable.findOne({ email: email });

        if (!user) {
            return res.status(401).send({ message: "Invalid Credentials" });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).send({ message: "password does not match" });
            } else {
                const token = jswt.sign({ id: user.id }, secretKey, { expiresIn: "100h" })
                res
                    .status(200)
                    .send({
                        status: "successfull",
                        message: "login successfull",
                        token: token,
                        user
                    });
            }
        }

    } catch (error) {
        res.status(500).send({ status: "failed", errors: errors.errors });
        console.log("erroe check", error);
    }
};
module.exports = Login;
