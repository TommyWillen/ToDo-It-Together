import { useMutation } from "@apollo/client";
import React from "react";

import { TrashCanIcon } from ".";
import { DELETE_TODO } from "../../utils/graphql/todoMutations";
import { GET_USER_TODOS } from "../../utils/graphql/todoQueries";

const DeleteTodoButton = ({todoId, username}) => {
  const [deleteTodo] = useMutation(DELETE_TODO, {
      variables: {
          toDoId: todoId
      },
      update(proxy){
          const data = proxy.readQuery({
              query: GET_USER_TODOS,
              variables: {
                  globality: true,
                  username: username,
              }
          })
          proxy.writeQuery({
              query: GET_USER_TODOS,
              variables: {
                  globality: true,
                  username: username
              },
              data: {
                  getSelectedToDosByUsername: data.getSelectedToDosByUsername.filter(todo => todo.id !== todoId)
              }
          })
      }
  })
  
    return <TrashCanIcon onClick={deleteTodo} />;
};

export default DeleteTodoButton;
