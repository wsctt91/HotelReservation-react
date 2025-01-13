import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteHotel as deleteHoteApi } from "../../services/apiHotels";

// 删除酒店API
export function useDeleteHotel() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteHotel } = useMutation({
    mutationFn: deleteHoteApi, // 删除酒店
    // !onSuccess表示在删除酒店成功后执行的回调函数
    onSuccess: () => {
      toast.success("Hotel deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["hotels"], // 使得酒店列表重新获取数据
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteHotel };
}
