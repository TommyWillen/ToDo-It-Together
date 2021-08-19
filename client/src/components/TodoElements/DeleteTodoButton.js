import { useMutation } from "@apollo/client";
import React from "react";

import { TrashCanIcon } from ".";
import {
  DELETE_COMMENT_MUTATION,
  DELETE_TODO,
} from "../../utils/graphql/todoMutations";
import { GET_USER_TODOS } from "../../utils/graphql/todoQueries";

const DeleteTodoButton = ({ toDoId, username, commentId, callback }) => {
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_TODO;
  const [deleteTodo] = useMutation(mutation, {
    variables: {
      toDoId,
      commentId,
    },
    update(proxy) {
      if (!commentId) {
        const data = proxy.readQuery({
          query: GET_USER_TODOS,
          variables: {
            globality: true,
            username: username,
          },
        });
        proxy.writeQuery({
          query: GET_USER_TODOS,
          variables: {
            globality: true,
            username: username,
          },
          data: {
            getSelectedToDosByUsername: data.getSelectedToDosByUsername.filter(
              (todo) => todo.id !== toDoId
            ),
          },
        });
      }
      if(callback) callback()
    },
  });

  return <TrashCanIcon onClick={deleteTodo} className={commentId ? "comment-trash" : ""} />;
};

export default DeleteTodoButton;
