import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useNavigate } from "react-router-dom";
// import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.4rem 2rem;
  border-right: 1px solid var(--color-grey-200);
  grid-row: 1/-1; // 从第一行到最后一行
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

function Sidebar() {
  const navigate = useNavigate();

  return (
    <StyledSidebar>
      <Logo onClick={() => navigate("/dashboard")} />
      <MainNav />
      {/* 自动上传 */}
      {/* <Uploader /> */}
    </StyledSidebar>
  );
}

export default Sidebar;
