import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

// 上传checkout信息到supabase，更新status为checked-out
export function useCheckout() {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();    页面导航

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`予約 ${data.id} チェックアウトが完了しました`);
      queryClient.invalidateQueries(["bookings"]);
    },

    onError: () => toast.error("チェックアウトできませんでした"),
  });

  return { checkout, isCheckingOut };
}
