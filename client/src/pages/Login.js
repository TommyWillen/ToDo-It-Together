import { useContext, useState } from "react";
import {useMutation} from "@apollo/client"

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import {
  FormContainer,
  FormTitle,
  InputContainer,
  InputButtonContainer,
  Input,
  InputButton
} from "../components/FormElements/FormElements";

const Login = () => {
  return (
    <FormContainer>
      <FormTitle>Login</FormTitle>
      <InputContainer>
        <Input type="text" placeholder="Email" />
        <Input type="text" placeholder="Password" />
      </InputContainer>
      <InputButtonContainer>
        <InputButton content="Login" />
      </InputButtonContainer>
    </FormContainer>
  );
};

export default Login;
