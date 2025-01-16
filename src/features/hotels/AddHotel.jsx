import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateHotelForm from "./CreateHotelForm";

// !复合组件模式
function AddHotel() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="hotel-form">
          <Button>新規追加</Button>
        </Modal.Open>
        <Modal.Window name="hotel-form">
          <CreateHotelForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddHotel() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>新規追加</Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateHotelForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddHotel;
