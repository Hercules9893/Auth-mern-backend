const userTable = require("../../../models/usertable");  // Import the model correctly

const Profile = async (req, res) => {
    const userId = req.user.id;
    console.log(123456,userId);
    try {
        const userdetail = await userTable.findById(userId);  // Use the correct model name
        if (!userdetail) {
            return res.status(404).send({error: "User not found" });
        }
        res.send({ status: "success", data: userdetail });
    } catch (error) {
        res.status(500).send({ status: "failed", errors: error.message });
    }
};

module.exports = Profile;
