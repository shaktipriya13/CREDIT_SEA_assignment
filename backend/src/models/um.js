const mongoose = require('mongoose');
const { type } = require('os');
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["admin", "verifier", "user"]
        },

    }, {
    timestamps: true,
});

module.exports=mongoose.model("User",userSchema);