import { useState } from "react";
import HotelTable from "../features/hotels/HotelTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateHotelForm from "../features/hotels/CreateHotelForm";

// 酒店页面
function Hotels() {
  // useEffect 用来在组件渲染后执行副作用
  // useEffect(function () {
  //   getHotels().then((data) => console.log(data));
  // }, []);

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">プレミアム部屋リスト</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <HotelTable />
        <Button onClick={() => setShowForm((show) => !show)}>新規追加</Button>
        {/* 如果showForm为true，则显示CreateHotelForm组件 */}
        {showForm && <CreateHotelForm />}
      </Row>
    </>
  );
}

export default Hotels;
