const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  userImage: {
    type: String,
    default: "",
  },
  friendsList: [
    {
      friendId: String,
      friendName: { type: String, default: "" },
      friendshipStart: String,
    },
  ],
});

module.exports = model("User", userSchema);
