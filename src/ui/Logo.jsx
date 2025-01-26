import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 12rem;
  width: auto;
`;

function Logo({ onClick, style }) {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode
    ? "/public/logo02-dark.png"
    : "/public/logo02-light.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" onClick={onClick} style={style} />
    </StyledLogo>
  );
}

export default Logo;
