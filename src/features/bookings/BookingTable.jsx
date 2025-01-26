import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import BookingRow from "./BookingRow";
import { useBookings } from "./useBookings";
import Pagination from "../../ui/Pagination";

// 预定列表
function BookingTable() {
  const { bookings, isLoading, count } = useBookings();
  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>部屋</div>
          <div>ゲスト</div>
          <div>期日</div>
          <div>状态</div>
          <div>ブーキング総額</div>
          <div></div>
        </Table.Header>

        {/* 具体内容 */}
        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        {/* 底部导航 */}
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
