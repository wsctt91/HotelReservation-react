import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHotel as deleteHoteApi } from "../../services/apiHotels";
import toast from "react-hot-toast";

// 删除酒店API
export function useDeleteHotel() {
  const queryClient = useQueryClient();

  // 删除酒店
  const { mutate: deleteHotel, isLoading: isDeleting } = useMutation({
    mutationFn: deleteHoteApi, // 删除酒店
    // !onSuccess表示在删除酒店成功后执行的回调函数
    onSuccess: () => {
      toast.success("ホテルは削除されました");
      queryClient.invalidateQueries({
        queryKey: ["hotels"], // 使得酒店列表重新获取数据
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteHotel, isDeleting };
}
