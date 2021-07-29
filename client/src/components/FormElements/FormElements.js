import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  background: rgb(188, 152, 106, 0.5);
  backdrop-filter: blur(8.5px);
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  box-shadow: 0 8px 32px 0;
  border-radius: 10px;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`;

export const FormTitle = styled.h2`
  margin: 3rem 0 2rem 0;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

export const InputButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Input = ({ type, placeholder }) => {
  return <StyledInput type={type} placeholder={placeholder} />;
};

const StyledInput = styled.input`
  background: rgb(251, 238, 193, 0.5);
  box-shadow: 0 8px 32px 0;
  border-radius: 2rem;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-color: ${(props) => (props.validationFailed ? "red" : "transparent")};
  outline: none;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    box-shadow: none;
    background: rgb(251, 238, 193);
  }
  &::placeholder {
    font-weight: 100;
  }
`;

export const InputButton = ({ content }) => {
  return <StyledButton>{content}</StyledButton>;
};

const StyledButton = styled.button`
    background: linear-gradient(to right, #FBEEC1 0%, #DAAD86 79%);
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 65%;
    height: 3rem;
    border: none;
    border-radius: 2rem;
    cursor: pointer;
`
