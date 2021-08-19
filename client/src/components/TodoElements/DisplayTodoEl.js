import { Fragment, useContext, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import {
  CommentButton,
  CommentButtonArrow,
  CommentBody,
  CommentCard,
  CommentCountSpan,
  CommentForm,
  CommentInput,
  CommentUserImage,
  CommentUsername,
} from ".";
import { CREATE_COMMENT_MUTATION } from "../../utils/graphql/todoMutations";
import noUserPic from "../../assets/blank-profile-picture.png";
import { GET_USERS_BY_USERNAMES } from "../../utils/graphql/userQueries";
import { AuthContext } from "../../context/auth";
import DeleteTodoButton from "./DeleteTodoButton";

const DisplayTodoEl = ({ todo }) => {
    const {user} = useContext(AuthContext)
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);
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

  const commentDisplayFunc = (comment) => {
      if (loading) {
          return <p>Loading Comments...</p>
      } else {
        const commentUser = data.getUsersByUsernames.filter(user => user.username === comment.username)
        return (
            <>
            <CommentUserImage src={commentUser[0].userImage ? commentUser[0].userImage : noUserPic} />
            <CommentUsername>{commentUser[0].username}</CommentUsername>
            <CommentBody>{comment.body}{comment.username === user.username || todo.username === user.username ? <DeleteTodoButton toDoId={todo.id} commentId={comment.id} />:null}</CommentBody>
            </>
        )
      }

  }

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
                <Fragment key={comment.id}>
                {commentDisplayFunc(comment)}
                </Fragment>
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
