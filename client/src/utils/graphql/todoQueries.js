import { gql } from "@apollo/client";

export const GET_SINGLE_TODO = gql`
  query GetTodo($toDoId: ID!) {
      getToDo(toDoId: $toDoId){
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
`

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