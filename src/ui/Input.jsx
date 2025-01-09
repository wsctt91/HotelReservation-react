import styled from "styled-components";

const Input = styled.input`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  &:focus {
    border-color: var(--color-primary-500);
    outline: none;
    box-shadow: 0 0 0 2px var(--color-brand-500);
  }
`;

export default Input;
