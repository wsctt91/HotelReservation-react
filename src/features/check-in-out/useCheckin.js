import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

// 上传Checkin信息到supabase，更新status为checked-in，isPaid为true
export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`予約 ${data.id} チェックインが完了しました`);
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/bookings");
    },

    onError: () => toast.error("予約をチェックインできませんでした"),
  });

  return { checkin, isCheckingIn };
}
