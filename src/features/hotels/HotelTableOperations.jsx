import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

// 酒店详情筛选&排序 Section
function HotelTableOperations() {
  return (
    <TableOperations>
      {/* 过滤 */}
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "全部" },
          { value: "no-discount", label: "割引なし" },
          { value: "with-discount", label: "割引あり" },
        ]}
      />
      {/* 筛选 */}
      <SortBy
        options={[
          { value: "name-asc", label: "並び替え(高い順)" },
          { value: "name-desc", label: "並び替え(低い順)" },
          { value: "regularPrice-asc", label: "価格の安い順" },
          { value: "regularPrice-desc", label: "価格の高い順" },
          { value: "maxCapacity-asc", label: "定員の少ない順" },
          { value: "maxCapacity-desc", label: "定員の多い順" },
        ]}
      />
    </TableOperations>
  );
}

export default HotelTableOperations;
