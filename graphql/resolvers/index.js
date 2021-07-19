const toDosResolvers = require("./toDos");
const userResolvers = require("./users");
const friendRequestResolvers = require("./friendRequest");

module.exports = {
  ToDo: {
    reminderCount: (parent) => parent.reminders.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...userResolvers.Query,
    ...toDosResolvers.Query,
    ...friendRequestResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...toDosResolvers.Mutation,
    ...friendRequestResolvers.Mutation,
  },
};
