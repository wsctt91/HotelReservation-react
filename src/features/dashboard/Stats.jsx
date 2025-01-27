import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiCash,
  HiChartBar,
  HiClipboardCheck,
  HiClipboardList,
} from "react-icons/hi";

function Stats({ bookings, confirmedStays, numDays, hotelCount }) {
  // 1 bookings
  const numbookings = bookings.length;
  // 2 sales
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  // 3 check-ins -> confirmedStays
  const checkins = confirmedStays.length;
  // 4 occupancy rate -> 入住的天数 / 预订的天数
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * hotelCount);

  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiClipboardList />}
        value={numbookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiCash />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiClipboardCheck />}
        value={checkins}
      />{" "}
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
