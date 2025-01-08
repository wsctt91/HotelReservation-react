import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getHotels } from "../services/apiHotels";

function Hotels() {
  // useEffect 用来在组件渲染后执行副作用
  useEffect(function () {
    getHotels().then((data) => console.log(data));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All Hotels</Heading>
      <p>TEST</p>
      <img src="https://hgfvypbmvfxhzpsywxpx.supabase.co/storage/v1/object/public/hotel-image/hotel-001.jpg" />
    </Row>
  );
}

export default Hotels;
