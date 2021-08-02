import { gql } from "@apollo/client";

export const GET_USER_TODOS = gql`
  query GetUserTodos(
    $globality: Boolean!
    $username: String!
    $day: String
    $month: String
    $year: String
  ) {
    getSelectedToDosByUsername(
      globality: $globality
      username: $username
      day: $day
      month: $month
      year: $year
    ) {
      id
      toDoName
      time
      day
      month
      year
      username
      body
      isComplete
      category
      reminders {
        id
        body
        username
        alertTime
        alertDate
      }
      globality
      canRemind
      canComment
      comments {
        id
        body
        username
        createdAt
      }
      isPublic
      viewList {
        id
        username
      }
      reminderCount
      commentCount
      color
      createdAt
    }
  }
`;

export const UPDATE_USER_TODO = gql`
  mutation UpdateTodoMutation(
    $TodoId: ID!
    $TodoName: String!
    $time: String
    $day: String
    $month: String
    $year: String
    $body: String!
    $isComplete: Boolean!
    $globality: Boolean!
    $canRemind: Boolean!
    $canComment: Boolean!
    $category: String
    $isPublic: Boolean!
    $color: String!
  ) {
    updateToDo(
      toDoId: $TodoId
      toDoName: $TodoName
      time: $time
      day: $day
      month: $month
      year: $year
      body: $body
      isComplete: $isComplete
      globality: $globality
      canRemind: $canRemind
      canComment: $canComment
      category: $category
      isPublic: $isPublic
      color: $color
    ) {
      id
      toDoName
      time
      day
      month
      year
      username
      body
      isComplete
      reminders {
        id
        body
        username
        alertTime
        alertDate
      }
      globality
      canRemind
      canComment
      comments {
        id
        body
        username
        createdAt
      }
      isPublic
      reminderCount
      commentCount
      createdAt
    }
  }
`;
