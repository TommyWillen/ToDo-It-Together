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
      friendId: { type: Schema.Types.ObjectId, ref: "User" },
      friendName: { type: String, default: "" },
      friendshipStart: String,
    },
  ],
});

module.exports = model("User", userSchema);
