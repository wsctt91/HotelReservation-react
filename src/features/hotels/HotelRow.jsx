import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHotel } from "../../services/apiHotels";
import toast from "../../../node_modules/react-hot-toast/src/index";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Hotel = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

// 酒店列表 -> row
function HotelRow({ hotel }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = hotel;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteHotel, // 删除酒店
    // !onSuccess表示在删除酒店成功后执行的回调函数
    onSuccess: () => {
      toast.success("Hotel deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["hotels"], // 使得酒店列表重新获取数据
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <TableRow role="row">
      <Img src={image} />
      <Hotel>{name}</Hotel>
      <div>最大{maxCapacity}名様まで宿泊可能</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button onClick={() => mutate(id)} disabled={isLoading}>
        Delete
      </button>
    </TableRow>
  );
}

export default HotelRow;
