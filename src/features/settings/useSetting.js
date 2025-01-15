import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

// 使用 useQuery hook 來获取 setting
export function useSetting() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, error, settings };
}
