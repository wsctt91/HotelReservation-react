import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEditHotel } from "../../services/apiHotels";
import toast from "react-hot-toast";

export function useEditHotel() {
  const queryClient = useQueryClient();

  // 编辑酒店信息
  const { mutate: editHotel, isLoading: isEditing } = useMutation({
    mutationFn: ({ newHotelData, id }) => CreateEditHotel(newHotelData, id),
    onSuccess: () => {
      toast.success("Hotel created successfully");
      queryClient.invalidateQueries({
        queryKey: ["hotels"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editHotel, isEditing };
}
