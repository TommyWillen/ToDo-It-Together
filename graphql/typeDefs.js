const { gql } = require("apollo-server");

module.exports = gql`
  type ToDo {
    id: ID!
    name: String!
    time: String
    day: String
    month: String
    year: String
    username: String!
    body: String!
    isComplete: Boolean!
    reminders: [Reminder]!
    globality: Boolean!
    canRemind: Boolean!
    canComment: Boolean!
    comments: [Comment]!
    category: String!
    isPublic: Boolean!
    viewList: [ViewList]!
    reminderCount: Int!
    commentCount: Int!
    createdAt: String!
  }
  type Reminder {
    id: ID!
    body: String!
    username: String!
    alertTime: String!
    alertDate: String!
  }
  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type ViewList {
    id: ID!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    userImage: String!
    friendsList: [FriendsList]!
  }
  type FriendRequest {
      id: ID!
      requester: String!
      recipient: String!
      status: Int!
  }
  type FriendsList {
    id: ID!
    friendId: String!
    friendName: String!
    friendshipStart: String!
  }
  input SignUpInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input CanViewList {
    username: String!
  }
  type Query {
    getSelectedToDosByUsername(
      globality: Boolean!,
      username: String!,
      day: String,
      month: String,
      year: String,
    ): [ToDo]
    getToDo(toDoId: ID!): ToDo
    getFriendsToDos(
      userId: String!,
      isGlobal: Boolean!,
      day: String,
      month: String,
      year: String,
    ): [ToDo]
    getUserByUsername(username: String!): User
    getFriendRequests(username: String!): [FriendRequest]
    getRequestedFriends(username: String!): [FriendRequest]
  }
  type Mutation {
    signUp(signUpInput: SignUpInput): User!
    login(username: String!, password: String!): User!
    createToDo(
      toDoName: String!,
      time: String,
      day: String,
      month: String,
      year: String,
      body: String!,
      globality: Boolean!,
      canRemind: Boolean!,
      canComment: Boolean!,
      category: String,
      isPublic: Boolean!,
      viewList: [CanViewList]
    ): ToDo!
    updateToDo(
      toDoId: ID!,
      toDoName: String!,
      time: String,
      day: String,
      month: String,
      year: String,
      body: String!,
      isComplete: Boolean!,
      globality: Boolean!,
      canRemind: Boolean!,
      canComment: Boolean!,
      category: String,
      isPublic: Boolean!,
      viewList: [CanViewList]
    ): ToDo!
    deleteToDo(toDoId: ID!): String!
    createReminder(
      toDoId: ID!,
      alertTime: String!,
      alertDate: String!,
      body: String!
    ): ToDo!
    deleteReminder(toDoId: ID!, reminderId: ID!): Reminder!
    createComment(toDoId: ID!, body: String!): ToDo!
    deleteComment(toDoId: ID!, commentId: ID!): Comment!
    sendFriendRequest(friendUsername: String!): FriendRequest!
    updateFriendRequest(friendRequestId: ID!, status: Int!): FriendRequest!
    removeFriend(friendId: String!, userId: String!): User!
  }
`;
