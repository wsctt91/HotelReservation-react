import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

// DashBoard 页面布局
function DashboardLayout() {
  const { isLoading: RecentBookingsIsLoading, bookings } = useRecentBookings();
  const {
    isLoading: RecentStaysIsLoading,
    stays,
    confirmStays,
  } = useRecentStays();

  if (RecentBookingsIsLoading || RecentStaysIsLoading) {
    return <Spinner />;
  }
  // console.log(bookings);

  return (
    <StyledDashboardLayout>
      <div>统计数据</div>
      <div>活动列表</div>
      <div>时间列表</div>
      <div>销售列表</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
