import styled from "styled-components";
import breakpoints from "../../utils/breakpoints";

export const Wrapper = styled.div`
margin: auto;

  @media ${breakpoints.xs} {
    max-width: 100%;
  };
  @media ${breakpoints.sm} {
    max-width: 540px;
  };
  @media ${breakpoints.md} {
    max-width: 720px;
  };
  @media ${breakpoints.lg} {
    max-width: 960px;
  };
  @media ${breakpoints.xl} {
    max-width: 1140px;
  };
  @media ${breakpoints.xxl} {
    max-width: 1320px;
  };
`;
