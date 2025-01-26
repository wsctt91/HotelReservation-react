import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

// 处理注册逻辑
export default function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      //   console.log(user);
      toast.success(
        "アカウントが正常に作成されました。ユーザーのメールアドレスから新しいアカウントを確認してください。"
      );
    },
  });

  return {
    signup,
    isLoading,
  };
}
