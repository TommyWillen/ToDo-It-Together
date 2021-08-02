import { Switch } from "react-router-dom";

import MainComponents from "../../components/MainComponents";
import NoAuthRoute from "../../utils/NoAuthRoute";
import Profile from "./Profile";
import SingleToDo from "./SingleToDo";
import GlobalTodos from "./GlobalTodos";

const profilePages = () => {
  return (
    <MainComponents>
      <Switch>
        <NoAuthRoute exact path="/profile" component={Profile} />
        <NoAuthRoute exact path="/profile/todo/:id" component={SingleToDo} />
        <NoAuthRoute exact path="/profile/todos/global" component={GlobalTodos} />
      </Switch>
    </MainComponents>
  );
};

export default profilePages;
