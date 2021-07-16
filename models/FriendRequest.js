const { model, Schema } = require("mongoose");

const FriendRequestSchema = new Schema({
    requester: String,
    recipient: String,
    status: Number,
})

module.exports = model("FriendRequests", FriendRequestSchema)