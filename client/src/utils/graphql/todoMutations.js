import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation CreateTodoMutation(
    $toDoName: String!
    $time: String
    $day: String
    $month: String
    $year: String
    $body: String!
    $globality: Boolean!
    $canRemind: Boolean!
    $canComment: Boolean!
    $category: String
    $isPublic: Boolean!
    $color: String!
  ) {
    createToDo(
      toDoName: $toDoName
      time: $time
      day: $day
      month: $month
      year: $year
      body: $body
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

export const DELETE_TODO = gql`
  mutation DeleteTodoMutation($toDoId: ID!) {
    deleteToDo(toDoId: $toDoId)
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($toDoId: ID!, $body: String!) {
    createComment(toDoId: $toDoId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;
