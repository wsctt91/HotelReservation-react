import Filter from "../../ui/Filter";

// Dashboard 过滤器组件
function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "過去 7 日間" },
        { value: "30", label: "過去 30 日間" },
        { value: "90", label: "過去 90 日間" },
      ]}
    />
  );
}

export default DashboardFilter;
