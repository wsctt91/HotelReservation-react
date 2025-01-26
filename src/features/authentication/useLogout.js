import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

// 处理登出逻辑
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      // !登出成功后，清除缓存中的用户信息
      queryClient.removeQueries();
      // replace: true 会替换掉当前的历史记录
      navigate("/dashboard", { replace: true });
    },
  });

  return {
    logout,
    isLoading,
  };
}
