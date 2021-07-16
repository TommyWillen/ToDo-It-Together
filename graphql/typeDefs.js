const { gql } = require("apollo-server");

module.exports = gql`
  type ToDo {
    id: ID!
    name: String!
    time: String!
    day: String!
    month: String!
    year: String!
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
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    userImage: String!
    sentRequest: [SentRequest]!
    request: [Request]!
    friendsList: [FriendsList]!
  }
  type SentRequest {
    id: ID!
    username: String!
  }
  type Request {
    id: ID!
    userID: String!
    username: String!
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
  type Query {
    getSelectedToDosByUsername(globality: Boolean!, username: String!, day: String, month: String, year: String): [ToDo]
    getToDo(toDoId: ID!): ToDo
    getFriendsToDos(day: String, month: String!, year: String!, friendsList: FriendsList): [ToDo]
    getUserByUsername(username: String!): User
  }
  type Mutation {
    signUp(signUpInput: SignUpInput): User!
    login(username: String!, password: String!): User!
    createToDo(
      toDoName: String!
      time: String
      day: String
      month: String
      year: String
      body: String!
      globality: Boolean!
      canRemind: Boolean!
      canComment: Boolean!
      category: String
      isPublic: Boolean!
      viewList: ViewList
    ): ToDo!
    deleteToDo(toDoId: ID!): String!
    createReminder(toDoId: ID!, alertTime: String!, alertDate: String!): ToDo!
    deleteReminder(reminderId: ID!): Reminder!
    createComment(toDoId: ID!, body: String!): ToDo!
    deleteComment(commentId: ID!): Comment!
  }
`;
