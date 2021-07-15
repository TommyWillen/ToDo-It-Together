const toDosResolvers = require("./toDos");
const userResolvers = require("./users");

module.exports = {
  ToDo: {
    reminderCount: (parent) => parent.reminders.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...userResolvers.Query,
    ...toDosResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...toDosResolvers.Mutation,
  },
};
