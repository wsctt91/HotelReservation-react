import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

// 筛选&排序 Section
function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "日付で並べ替え (新しい順)" },
          { value: "startDate-asc", label: "日付で並べ替え (古い順)" },
          {
            value: "totalPrice-desc",
            label: "料金で並べ替え (高い順)",
          },
          { value: "totalPrice-asc", label: "料金で並べ替え (低い順)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
