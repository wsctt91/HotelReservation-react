import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

// 使用useQuery钩子函数获取当前用户
export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" }; // 返回用户、加载状态和是否验证的用户
}
