import Spinner from "../../ui/Spinner";
import HotelRow from "./HotelRow";
import useHotels from "./useHotels";
import Table from "../../ui/Table";
import MenusProvider from "../../ui/Menus";

/* const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`; */

// 酒店表格
function HotelTable() {
  // 使用useQuery hook获取酒店列表 导入
  const { isLoading, hotels } = useHotels();

  if (isLoading) {
    return <Spinner />;
  }
  // *复合组件的使用
  return (
    <MenusProvider>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        {/* 列表顶部 */}
        <Table.Header>
          <div></div>
          <div>部屋タイプ</div>
          <div>宿泊人数</div>
          <div>予約料金</div>
          <div>割引価格</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={hotels}
          render={(hotel) => <HotelRow hotel={hotel} key={hotel.id} />}
        />
      </Table>
    </MenusProvider>
  );
}

export default HotelTable;
