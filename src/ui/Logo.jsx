import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 12rem;
  width: auto;
`;

function Logo({ onClick, style }) {
  return (
    <StyledLogo>
      <Img
        src="/public/logo02-light.png"
        alt="Logo"
        onClick={onClick}
        style={style}
      />
    </StyledLogo>
  );
}

export default Logo;
