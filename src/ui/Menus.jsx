import { createContext, useContext, useState } from "react";
import { HiViewGrid } from "react-icons/hi";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  /* 出现在点击的按钮下方，位置确定 */
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

// 列表 -> 右侧弹出选项卡
const MenusContext = createContext();

function MenusProvider({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({});

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

// MenusProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    // 控制位置 使其出现在点击的按钮下方
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
    // console.log(rect);
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiViewGrid />
    </StyledToggle>
  );
}

// Toggle.propTypes = {
//   id: PropTypes.string.isRequired,
// };

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);
  if (openId !== id) {
    return null;
  }

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

// List.propTypes = {
//   id: PropTypes.string.isRequired, // 新增 id 属性的 PropTypes
//   children: PropTypes.node.isRequired,
//   position: PropTypes.object.isRequired,
// };

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

// Button.propTypes = {
//   children: PropTypes.node.isRequired,
//   icon: PropTypes.element, // 新增 icon 属性的 PropTypes
//   onClick: PropTypes.func, // 新增 onClick 属性的 PropTypes
// };

MenusProvider.Menu = Menu;
MenusProvider.Toggle = Toggle;
MenusProvider.List = List;
MenusProvider.Button = Button;

export default MenusProvider;
