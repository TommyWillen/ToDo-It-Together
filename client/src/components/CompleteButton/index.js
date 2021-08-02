import { useState } from "react";
import { CompleteTodoButton, IncompleteButton } from "./CompleteButtonElements";

const CompleteButton = ({ todo }) => {
  const [isComplete, setIsComplete] = useState(todo.isComplete);

  const handleCompleteButton = async () => {
    await setIsComplete(!isComplete);
  };

  return <>{isComplete ? <CompleteTodoButton /> : <IncompleteButton />}</>;
};

export default CompleteButton;
