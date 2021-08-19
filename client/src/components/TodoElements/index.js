import styled from "styled-components";
import { ImPlus } from "react-icons/im";
import { IoTrashSharp } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { GiBroadheadArrow } from "react-icons/gi";


export const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

export const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #085025;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

export const CheckBoxWrapper = styled.div`
  position: relative;
  float: ${(props) => (props.float ? props.float : "left")};
`;

export const CommentButtonArrow = styled(GiBroadheadArrow)`
transform: rotate(-45deg);
color: ${props => props.theme.colors.earthBlack};
padding: 6px 0 6px 0;
`

export const CommentButton = styled.button`
background: #f5f5f5;
border: none;
border-radius: 0 10px 10px 0;
&:hover {
  background: #808080;
}
&:hover ${CommentButtonArrow} {
  color: #f5f5f5;
}
`

export const CommentCard = styled.div`
width: 100%;
background: #899499;
padding: 0 0 5px 0;
`

export const CommentCountSpan = styled.span`
background: ${props => props.theme.colors.earthBlack};
color: ${props => props.theme.colors.cream};
padding: 2px 5px 2px 5px;
border-radius: 50%;
font-size: 0.7rem;
`

export const CommentForm = styled.form`
display: flex;
flex-direction: row;
border-radius: 20px;
padding: 2px;
width: 50%;
@media ${props => props.theme.breakpoints.md} {
  width: 100%;
}
`

export const CommentUserImage = styled.img`
border-radius: 50%;
max-width: 30px;
float: left;
margin-top: 5px;
margin-left: 10px;
`

export const CommentUsername = styled.p`
float: left;
clear: right;
margin: 5px 0 0 0;
font-weight: bold;
`

export const CommentBody = styled.p`
clear: both;
padding: 0;
margin: 0;
`

export const CommentInput = styled.input`
padding: 5px 2px 5px 8px;
flex-grow: 2;
border-radius: 10px 0 0 10px;
outline: none;
border-color: transparent;
@media ${props => props.theme.breakpoints.md} {
  width: 100%;
}
`

export const EditButton = styled(GoPencil)`
float: right;
margin-top: 3rem;
cursor: pointer;
+ h1 {
  clear: left;
}
font-size: 1.8rem;
@media ${(props) => props.theme.breakpoints.md} {
font-size: 1.4rem;
  }
`

export const PlusButton = styled(ImPlus)`
  margin-top: 0.2rem;
  margin-right: 0.3rem;
  color: ${(props) => props.theme.colors.earthBlack};
`;

export const SubmitTodoButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.3rem;
  border-radius: 18px;
  background: #659dbd;
  border: none;
  margin-left: 1rem;
  font-size: 1.3rem;
  &:hover {
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0);
    font-weight: bold;
    transition: 0.4s;
  }
`;

export const TodoBodyInput = styled.input`
  display: block;
  width: 100%;
  margin-top: 0.5rem;
  margin-left: 0.4rem;
  background: rgb(245, 245, 220);
  border-radius: 15px;
  font-size: 1rem;
  border: none;
  padding: 0.5rem;
`;

export const TodoDisplayCard = styled.section`
background: #fffff7;
border-radius: 8px;
& p, form {
  padding: 0.2rem 1rem;
}
`

export const TodoGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr repeat(12, minmax(auto, 4.2rem)) 1fr;
`;

export const TodoHeadEl = styled.h1`
  font-size: 3.5rem;

  @media ${(props) => props.theme.breakpoints.md} {
    font-size: 2.5rem;
  }
`;

export const TodoListEl = styled.ul`
  padding: 1.5rem;
  font-size: 1.5rem;
  list-style: none;
  & li {
    background: #f3e5ab;
    border-bottom: 0.3rem solid #333333;
    display: flex;
  }
  & li.completed {
    text-decoration: line-through;
  }

  & li:hover {
    background: #c4b783;
    cursor: pointer;
  }
  & li a {
    margin-left: 0.4rem;
    margin-top: 0.5rem;
    color: ${(props) => props.theme.colors.earthBlack};
    text-decoration: inherit;
  }
  & li.addTodo:hover {
    background: #f3e5ab;
  }
`;

export const TrashCanIcon = styled(IoTrashSharp)`
  margin-top: 0.2rem;
  margin-right: 0.3rem;
  color: #a9a9a9;
  background: transparent;
  &.comment-trash {
    color: #f5f5f5;
    float: right;
  }
  &:hover {
        color: maroon;
    }
`;