import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEditHotel } from "../../services/apiHotels";
import toast from "react-hot-toast";

export function useCreateHotel() {
  const queryClient = useQueryClient();
  // 创建酒店信息
  const { mutate: createHotel, isLoading: isCreating } = useMutation({
    mutationFn: CreateEditHotel,
    onSuccess: () => {
      toast.success("Hotel created successfully");
      queryClient.invalidateQueries({
        queryKey: ["hotels"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { createHotel, isCreating };
}
