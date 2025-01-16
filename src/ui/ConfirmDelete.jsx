import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

// 房间删除确认
function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">{resourceName} を削除する</Heading>
      <p>
        この {resourceName} を完全に削除してもよろしいですか?
        この操作は元に戻せません
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          キャンセル
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          削除
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
