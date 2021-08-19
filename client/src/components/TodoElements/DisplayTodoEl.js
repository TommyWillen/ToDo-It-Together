import { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import {
  CommentButton,
  CommentButtonArrow,
  CommentCard,
  CommentCountSpan,
  CommentForm,
  CommentInput,
} from ".";
import { CREATE_COMMENT_MUTATION } from "../../utils/graphql/todoMutations";
import noUserPic from "../../assets/blank-profile-picture.png";
import { GET_USERS_BY_USERNAMES } from "../../utils/graphql/userQueries";

const DisplayTodoEl = ({ todo }) => {
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);
  console.log(todo);
  const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      toDoId: todo.id,
      body: comment,
    },
  });

  const commentUsername = todo.comments
    .map((comment) => comment.username)
    .filter((value, index, self) => self.indexOf(value) === index);

  const { loading, data } = useQuery(GET_USERS_BY_USERNAMES, {
    variables: {
      username: commentUsername,
    },
  });

  console.log(commentUsername);

  return (
    <div>
      {!todo.globality ? (
        <p>
          Scheduled for {todo.month}/{todo.day}/{todo.year}
        </p>
      ) : null}
      {/* content to add:
             body
             comments
             category
             comments
             commentCount
             */}
      <p>Category: {todo.category}</p>
      <p>Additional Notes: {todo.body}</p>
      {todo.canComment ? (
        <CommentCard>
          <p>
            Comments <CommentCountSpan>{todo.commentCount}</CommentCountSpan>
          </p>
          <CommentForm>
            <CommentInput
              type="text"
              placeholder="Leave a comment..."
              name="comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              ref={commentInputRef}
            />
            <CommentButton
              type="submit"
              disabled={comment.trim() === ""}
              onClick={submitComment}
            >
              <CommentButtonArrow />
            </CommentButton>
          </CommentForm>
          {todo.comments.length > 0 ? (
            todo.comments.map((comment) => (
              <p key={comment.id}>{comment.body}</p>
            ))
          ) : (
            <p>No comments add some</p>
          )}
        </CommentCard>
      ) : null}
    </div>
  );
};

export default DisplayTodoEl;
