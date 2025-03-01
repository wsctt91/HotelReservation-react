import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

// 获取酒店列表
// 使用useQuery钩子获取酒店列表
export function useBooking() {
  const { bookingId } = useParams();
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId], // 查询键：酒店列表 + 酒店ID 作为查询键
    queryFn: () => getBooking(bookingId), // 查询函数：获取酒店列表 getBooking 函数 + 酒店ID 作为参数
    retry: false,
  });

  return { isLoading, booking, error };
}
