import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import { LOGIN_USER } from "../utils/graphql/userMutations";
import {
  FormContainer,
  FormTitle,
  InputContainer,
  InputButtonContainer,
  Input,
  InputButton,
  ErrorListItem,
} from "../components/FormElements/FormElements";

const Login = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const loginUserCallback = () => {
    loginUser();
  };

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/profile");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  return (
    <FormContainer onSubmit={onSubmit} className={loading ? "loading" : ""}>
      <FormTitle>Login</FormTitle>
      <InputContainer>
        <Input
          placeholder="Username..."
          label="Username"
          name="username"
          type="text"
          value={values.username}
          validationFailed={errors.username ? true : false}
          onChange={onChange}
        />
        <Input
          type="password"
          placeholder="Password"
          label="Password"
          name="password"
          value={values.password}
          validationFailed={errors.password ? true : false}
          onChange={onChange}
        />
        <InputButtonContainer>
          <InputButton content="Login" type="submit">
            Login
          </InputButton>
        </InputButtonContainer>
      </InputContainer>

      {Object.keys(errors).length > 0 && (
        <InputContainer>
          <ul>
            {Object.values(errors).map((value) => {
              return <ErrorListItem key={value}>{value}</ErrorListItem>;
            })}
          </ul>
        </InputContainer>
      )}
    </FormContainer>
  );
};

export default Login;
