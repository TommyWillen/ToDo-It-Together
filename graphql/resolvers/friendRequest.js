const { AuthenticationError, UserInputError } = require("apollo-server");

const FriendRequest = require("../../models/FriendRequest");
const User = require("../../models/User");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getFriendRequests(_, { username }) {
      try {
        const friendRequests = await FriendRequest.find({
          requester: username,
        });
        return friendRequests;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getRequestedFriends(_, { username }) {
      try {
        const friendRequests = await FriendRequest.find({
          recipient: username,
        });
        return friendRequests;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async sendFriendRequest(_, { friendUsername }, context) {
      const { username } = checkAuth(context);

      const currentRequest = await FriendRequest.find({
        requester: username,
        recipient: friendUsername,
      });
      const otherCurrentRequest = await FriendRequest.find({
        requester: friendUsername,
        recipient: username,
      });

      if (currentRequest || otherCurrentRequest) {
        throw new UserInputError("Friend request already sent/recieved");
      } else {
        const newFriendRequest = new FriendRequest({
          requester: username,
          recipient: friendUsername,
          status: 1,
        });
        const friendRequest = await newFriendRequest.save();
        return friendRequest;
      }
    },
    async updateFriendRequest(_, { friendRequestId, status }) {
      const friendRequest = FriendRequest.findById(friendRequestId);

      if (friendRequest) {
        if (status === 3) {
          await friendRequest.delete();
          return "Friend request removed";
        } else if (status === 2) {
          const user = await User.find({ username: friendRequest.recipient });
          const friend = await User.find({ username: friendRequest.requester });
          user.friendsList.push({
            friendId: friend._id,
            friendName: friend.username,
            friendshipStart: new Date().toISOString(),
          });
          friend.friendsList.push({
            friendId: user._id,
            friendName: user.username,
            friendshipStart: new Date().toISOString(),
          });
          await user.save();
          await friend.save();
          await friendRequest.delete();
          return { user, friend };
        } else {
          throw new UserInputError("Status code is not valid");
        }
      } else {
        throw new UserInputError("Friend request does not exist");
      }
    },
  },
};
