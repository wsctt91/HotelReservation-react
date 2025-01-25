import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// *验证登陆用户的路由
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1 加载验证的用户
  const { isLoading, isAuthenticated } = useUser();

  // 2 如果没有验证的用户，重定向到登录页面
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3 加载时，显示加载中的状态
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4 如果有验证的用户，渲染App, children是AppLayout组件(父路由)
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
