import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      userImage
      friendsList {
        id
        friendId
        friendName
        friendshipStart
      }
      token
    }
  }
`;

export const SIGNUP_USER = gql`
    mutation signUp(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        signUp(
            signUpInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            userImage
            friendsList {
                id
                friendId
                friendName
                friendshipStart
            }
            token
        }
    }
`