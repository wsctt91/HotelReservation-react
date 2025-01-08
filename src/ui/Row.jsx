import styled, { css } from "styled-components";

// Row是一個styled-component，用來設定flexbox排版
const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;
// 设置默认props
Row.defaultProps = {
  type: "vertical",
};

export default Row;
