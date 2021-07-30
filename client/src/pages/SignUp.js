import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import { SIGNUP_USER } from "../utils/graphql/userMutations";
import {
  FormContainer,
  FormTitle,
  InputContainer,
  InputButtonContainer,
  Input,
  InputButton,
  ErrorListItem,
} from "../components/FormElements/FormElements";


const SignUp = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const signupUser = () => {
    addUser();
  };
  const { onChange, onSubmit, values } = useForm(signupUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(SIGNUP_USER, {
    update(_, { data: { signUp: userData } }) {
      context.login(userData);
      props.history.push("/profile");
    },
    onError(err) {
        console.log(err)
      setErrors(err&&err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  return (
    <FormContainer onSubmit={onSubmit} className={loading ? "loading" : ""}>
      <FormTitle>Sign Up!</FormTitle>
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
          placeholder="Email..."
          label="Email"
          name="email"
          type="email"
          value={values.email}
          validationFailed={errors.email ? true : false}
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
        <Input
          type="password"
          placeholder="Confirm Password"
          label="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          validationFailed={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <InputButtonContainer>
          <InputButton content="Login" type="submit">
            Sign Up!
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

export default SignUp;
