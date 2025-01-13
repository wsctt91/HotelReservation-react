import { useQuery } from "@tanstack/react-query";
import { getHotels } from "../../services/apiHotels";

// 获取酒店列表
// 使用useQuery钩子获取酒店列表
function useHotels() {
  const {
    isLoading,
    data: hotels,
    error,
  } = useQuery({
    queryKey: ["hotels"],
    queryFn: getHotels,
  });
  return { isLoading, hotels, error };
}

export default useHotels;
