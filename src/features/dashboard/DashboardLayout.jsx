import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useHotels } from "../hotels/useHotels";
import TodayActivity from "../check-in-out/TodayActivity";

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
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { hotels, isLoading: hotelsIsLoading } = useHotels();

  if (RecentBookingsIsLoading || RecentStaysIsLoading || hotelsIsLoading) {
    return <Spinner />;
  }
  // console.log(bookings);

  return (
    <StyledDashboardLayout>
      {/* 数据 */}
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        hotelCount={hotels.length}
      />

      {/* 活动数据 */}
      <TodayActivity />

      {/* 饼状图表 */}
      <DurationChart confirmedStays={confirmedStays} />

      {/* 销售图表统计 */}
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
