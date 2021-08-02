import styled from "styled-components";

export const TodoGrid = styled.section`
display: grid;
grid-template-columns: 1fr repeat(12, minmax(auto, 4.2rem)) 1fr;
`

export const TodoHeadEl = styled.h1`
  font-size: 3.5rem;

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 2.5rem;
  }
`;

export const TodoListEl = styled.ul`
padding: 1.5rem;
font-size: 1.5rem;
list-style: none;
& li {
    background: #F3E5AB;
    border-bottom: .3rem solid #333333 ;
    display: flex;
    
}
& li.completed {
    text-decoration: line-through;
}

& li:hover {
  background: #C4B783;
  cursor: pointer;
}
& li a {
  margin-left: 0.4rem;
  margin-top: 0.5rem;
  color: ${props => props.theme.colors.earthBlack};
  text-decoration: inherit;
}
`