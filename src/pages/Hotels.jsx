import HotelTable from "../features/hotels/HotelTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddHotel from "../features/hotels/AddHotel";

// 酒店页面
function Hotels() {
  // useEffect 用来在组件渲染后执行副作用
  // useEffect(function () {
  //   getHotels().then((data) => console.log(data));
  // }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">プレミアム部屋リスト</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <HotelTable />
        {/* 添加房间 */}
        <AddHotel />
      </Row>
    </>
  );
}

export default Hotels;
