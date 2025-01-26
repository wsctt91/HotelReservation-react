import styled from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import BookingDataBox from "./BookingDataBox";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserRemove } from "react-icons/hi";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

// 预定详情页面
function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />;
  }

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">予約情報 -{bookingId}</Heading>
          <Tag $type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        {/* <ButtonText onClick={moveBack}>&larr; Back</ButtonText> */}
      </Row>

      {/* DATA页面 */}
      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            チェックイン
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            icon={<HiOutlineUserRemove />}
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
          >
            チェックアウト
          </Button>
        )}

        {/* 删除 */}
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">削除</Button>
          </Modal.Open>
          {/* 删除确认弹出框 */}
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="予約"
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate(-1), // 删除后返回上一页
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          戻る
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
