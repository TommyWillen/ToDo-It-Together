import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Link } from "react-router-dom";

import ColorPicker from "../../components/ColorPicker";
import CompleteButton from "../../components/CompleteButton";
import { Col } from "../../components/Grid/GridElements";
import {
  TodoGrid,
  TodoHeadEl,
  TodoListEl,
} from "../../components/TodoElements";
import AddSingleGlobalTodo from "../../components/TodoElements/AddSingleGlobalTodo";
import DeleteTodoButton from "../../components/TodoElements/DeleteTodoButton";
import { AuthContext } from "../../context/auth";
import { GET_USER_TODOS } from "../../utils/graphql/todoQueries";

const GlobalTodos = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(GET_USER_TODOS, {
    variables: {
      globality: true,
      username: user.username,
    },
  });



  return (
    <div>
      <TodoHeadEl>{user.username}'s Global Todos!</TodoHeadEl>
      <TodoListEl>
        {loading ? (
          <li>Loading posts...</li>
        ) : data.getSelectedToDosByUsername ? (
          data.getSelectedToDosByUsername.map((todo) => (
            <li key={todo.id} className={todo.isComplete ? "completed" : ""}>
              <TodoGrid>
                <Col span="1" spanMd="1" spanSm="1">
                  <ColorPicker todo={todo} />
                </Col>
                <Col span="9" spanMd="9" spanSm="9">
                  <Link to={`/profile/todo/${todo.id}`}>{todo.body}</Link>
                </Col>
                <Col span="1" spanMd="1" spanSm="1">
                  <CompleteButton todo={todo} />
                </Col>
                <Col span="1" spanMd="1" spanSm="1">
                  <DeleteTodoButton toDoId={todo.id} username={user.username}  />
                </Col>
              </TodoGrid>
            </li>
          ))
        ) : (
          <li>No Todos! Click the "+" to add one!</li>
        )}
        <AddSingleGlobalTodo username={user.username} />
      </TodoListEl>
    </div>
  );
};

export default GlobalTodos;
