import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      variation="primary"
      size="middle"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      チェックアウト
    </Button>
  );
}

export default CheckoutButton;
