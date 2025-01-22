import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  // 使用 useMutation hook 來更新 setting
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    // 更新成功时
    onSuccess: () => {
      toast.success("設定が更新されました");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    // 更新失败时
    onError: (err) => toast.error(err.message),
  });

  return { updateSetting, isUpdating };
}
