const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: [true, "already in database"],
        },
        mobile: {
            type: String,
            required: [true, "mobile is required"],
            unique: [true, "already in database"],
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const UserTable = mongoose.model("UserTable", userSchema);
module.exports = UserTable;
