import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineEye,
  HiOutlineUserAdd,
  HiOutlineUserRemove,
  HiOutlineTrash,
} from "react-icons/hi";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import MenusProvider from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const Hotel = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    status,
    totalPrice,
    guests: { fullName: guestName, email },
    hotels: { name: hotelName },
  },
}) {
  // 路由导航
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  // 确认状态对应的标签颜色
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Hotel>{hotelName}</Hotel>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} 泊
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      {/* 状态status */}
      <Tag $type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      {/* 总金额amount */}
      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        {/* 侧边栏按钮 */}
        <MenusProvider.Menu>
          <MenusProvider.Toggle id={bookingId} />
          <MenusProvider.List id={bookingId}>
            <MenusProvider.Button
              icon={<HiOutlineEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              詳細
            </MenusProvider.Button>
            {status === "unconfirmed" && (
              <MenusProvider.Button
                icon={<HiOutlineUserAdd />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                チェックイン
              </MenusProvider.Button>
            )}
            {status === "checked-in" && (
              <MenusProvider.Button
                icon={<HiOutlineUserRemove />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                チェックアウト
              </MenusProvider.Button>
            )}

            <Modal.Open opens="delete">
              <MenusProvider.Button icon={<HiOutlineTrash />}>
                削除
              </MenusProvider.Button>
            </Modal.Open>
          </MenusProvider.List>
        </MenusProvider.Menu>

        {/* 删除确认弹出框 */}
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="予約"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
