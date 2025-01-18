import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

// 获取订单列表
// 使用useQuery钩子获取订单列表
export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { isLoading, bookings, error };
}
