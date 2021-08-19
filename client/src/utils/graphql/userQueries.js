import {gql} from "@apollo/client"

export const GET_USERS_BY_USERNAMES = gql`
    query GetUsersByUsernames($username: [String]!) {
        getUsersByUsernames(username: $username) {
            id
            email
            username
            userImage
        }
    }
`