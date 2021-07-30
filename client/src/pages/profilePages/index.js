import { Switch } from "react-router-dom";

import MainComponents from "../../components/MainComponents";
import NoAuthRoute from "../../utils/NoAuthRoute";
import Profile from "./Profile";
import SingleToDo from "./SingleToDo";

const profilePages = () => {
  return (
    <MainComponents>
      <Switch>
        <NoAuthRoute exact path="/profile" component={Profile} />
        <NoAuthRoute exact path="/profile/todo/:id" component={SingleToDo} />
      </Switch>
    </MainComponents>
  );
};

export default profilePages;
