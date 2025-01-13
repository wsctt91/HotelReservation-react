import { useState } from "react";
import styled from "styled-components";
import CreateHotelForm from "./CreateHotelForm";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteHotel } from "./useDeleteHotel";
import {
  HiDocumentDuplicate,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";
import PropTypes from "prop-types";
import { useCreateHotel } from "./useCreateHotel";

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
  const [showForm, setShowForm] = useState(false);
  // 删除酒店 导入
  const { isDeleteing, deleteHotel } = useDeleteHotel();
  const { isCreating, createHotel } = useCreateHotel();
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    hotel;

  // Duplicate 复制酒店信息
  function handleDuplicate() {
    createHotel({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Hotel>{name}</Hotel>
        <div>最大{maxCapacity}名様まで宿泊可能</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={handleDuplicate} disabled={isCreating}>
            <HiDocumentDuplicate />
          </button>
          <button onClick={() => setShowForm((show) => !show)}>
            <HiOutlinePencilAlt />
          </button>
          <button onClick={() => deleteHotel(id)} disabled={isDeleteing}>
            <HiOutlineTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateHotelForm hotelToEdit={hotel} />}
    </>
  );
}

HotelRow.propTypes = {
  hotel: PropTypes.object.isRequired,
};

export default HotelRow;
