import styled from "styled-components";

export const Wrapper = styled.div`
  margin: auto;

  @media ${(props) => props.theme.breakpoints.xs} {
    max-width: 100%;
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    max-width: 540px;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    max-width: 720px;
  }
  @media ${(props) => props.theme.breakpoints.lg} {
    max-width: 960px;
  }
  @media ${(props) => props.theme.breakpoints.xl} {
    max-width: 1140px;
  }
  @media ${(props) => props.theme.breakpoints.xxl} {
    max-width: 1320px;
  } ;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(12, minmax(auto, 4.2rem)) 1fr;
  grid-template-rows: max-content;
  gap: ${(props) => (props.gapDefault ? props.gapDefault : "2rem 2rem")};
  margin: ${(props) => (props.marginDefault ? props.marginDefault : 0)};

  @media ${(props) => props.theme.breakpoints.md} {
    grid-template-columns: 2rem repeat(6, 1fr) 2rem;
    gap: ${(props) => (props.gapMedium ? props.gapMedium : "1rem 1rem")};
    margin: ${(props) => (props.marginMedium ? props.marginMedium : 0)};
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    grid-template-columns: 1rem repeat(6, 1fr) 1rem;
    gap: ${(props) => (props.gapSmall ? props.gapSmall : "1rem 1rem")};
    margin: ${(props) => (props.marginSmall ? props.marginSmall : 0)};
  }
`;

export const Row = styled.div`
  grid-column-start: ${(props) => (props.spanStart ? props.spanStart : "1")};
  grid-column-end: span ${(props) => (props.spanEnd ? props.spanEnd : "12")};

  @media ${(props) => props.theme.breakpoints.md} {
    grid-column-start: ${(props) =>
      props.spanStartMd ? props.spanStartMd : "1"};
    grid-column-end: span
      ${(props) => (props.spanEndMd ? props.spanEndMd : "6")};
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    grid-column-start: ${(props) =>
      props.spanStartSm ? props.spanStartSm : "1"};
    grid-column-end: span
      ${(props) => (props.spanEndSm ? props.spanEndSm : "6")};
  }
`;

export const Col = styled.div`
  grid-column: span ${(props) => (props.span ? props.span : "3")};

  @media ${(props) => props.theme.breakpoints.md} {
    grid-column: span ${(props) => (props.spanMd ? props.span : "4")};
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    grid-column: span ${(props) => (props.spanSm ? props.span : "6")};
  }
`;
