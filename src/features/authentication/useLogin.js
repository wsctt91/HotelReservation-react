import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// 这个自定义hook用于处理登录逻辑
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (data) => {
      const { user } = data;
      // !登录成功后，将用户信息存储到缓存中
      queryClient.setQueryData(["user"], user);
      // console.log(user);
      navigate("/dashboard");
    },

    onError: (error) => {
      console.error("Error", error);
      toast.error("メールアドレスまたはパスワードが間違っています");
    },
  });

  return {
    login,
    isLoading,
  };
}
