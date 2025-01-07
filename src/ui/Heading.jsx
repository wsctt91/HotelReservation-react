import styled, { css } from "styled-components";

// const test = css`
//   text-align: center;
//   ${10 > 5 && "bgcakground-color: yellow;"};
// `;

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 700;
      color: black;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 700;
      color: black;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
      color: black;
    `}

  line-height: 1.4;
`;

export default Heading;
