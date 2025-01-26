import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

// 自定义更新用户信息
export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,

    onSuccess: ({ user }) => {
      toast.success("ユーザーアカウントが正常に更新されました");
      // !注意
      queryClient.setQueryData(["user"], user);
      // queryClient.invalidateQueries({
      //   queryKey: ["user"],
      // });
    },

    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
