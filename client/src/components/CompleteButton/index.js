import { useState } from "react";
import { CompleteTodoButton, IncompleteButton } from "./CompleteButtonElements";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_TODO } from "../../utils/graphql/todoMutations";

const CompleteButton = ({ todo, float }) => {
  const [isComplete, setIsComplete] = useState(todo.isComplete);

  const [updateTodoCompleteStatus] = useMutation(UPDATE_USER_TODO, {
      variables: {
        TodoId: todo.id,
        TodoName: todo.toDoName,
        body: todo.body,
        isComplete: isComplete,
        globality: todo.globality,
        canRemind: todo.canRemind,
        canComment: todo.canComment,
        isPublic: todo.isPublic,
        color: todo.color,
      }
  })
  
  
  const handleCompleteButton = async () => {
    await setIsComplete(!isComplete);
    updateTodoCompleteStatus();
  };
console.log(float)
  return <>{isComplete ? <CompleteTodoButton onClick={handleCompleteButton} className={float ? "float-complete" : ""} /> : <IncompleteButton onClick={handleCompleteButton} className={float ? "float-complete" : ""} />}</>;
};

export default CompleteButton;
