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
      console.log(currentRequest)
      if (currentRequest.length > 0 || otherCurrentRequest > 0) {
        throw new UserInputError("Friend request already sent/recieved");
      } else {
        const newFriendRequest = new FriendRequest({
          requester: username,
          recipient: friendUsername,
          status: 1,
        });
        const friendRequest = await newFriendRequest.save();
        console.log(friendRequest)
        return friendRequest;
      }
    },
    async updateFriendRequest(_, { friendRequestId, status }) {
      const friendRequest = await FriendRequest.findById(friendRequestId);
        
      if (friendRequest) {
        if (status === 3) {
          await friendRequest.delete();
          return "Friend request removed";
        } else if (status === 2) {
          const user = await User.find({ username: friendRequest.recipient });
          const friend = await User.find({ username: friendRequest.requester });
          
          user[0].friendsList.unshift({
            friendId: friend[0].id,
            friendName: friend[0].username,
            friendshipStart: new Date().toISOString(),
          });
          friend[0].friendsList.unshift({
            friendId: user[0].id,
            friendName: user[0].username,
            friendshipStart: new Date().toISOString(),
          });
          
          await user[0].save();
          await friend[0].save();
          await friendRequest.delete();
          return { user, friend };
        } else {
          throw new UserInputError("Status code is not valid");
        }
      } else {
        throw new UserInputError("Friend request does not exist");
      }
    },
    async removeFriend(_,{friendId, userId}) {
        const user = await User.findById(userId)
        const friend = await User.findById(friendId)

        if (friend) {
            const friendIndex = user.friendsList.findIndex(f => f.friendId === friendId)
            const friendsUserIndex = friend.friendsList.findIndex(f => f.friendId === userId)
            user.friendsList.splice(friendIndex,1);
            friend.friendsList.splice(friendsUserIndex, 1);
            await user.save()
            await friend.save()
            return user
        } else {
            throw new UserInputError("Friend not found")
        }
    }
  },
};
