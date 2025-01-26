import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// 处理登录逻辑
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      // console.log(user);

      // !登录成功后，将用户信息存储到缓存中(注意这里的bug，setQueryData方法的第一个参数应该是一个数组)
      //  通过setQueryData方法，将用户信息存储到缓存中，key为["user"]
      queryClient.setQueryData(["user"], user.user);

      navigate("/dashboard", { replace: true });
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
