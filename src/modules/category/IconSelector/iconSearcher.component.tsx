// import { Dialog } from "primereact/dialog";
import Modal from "~/modules/components/atoms/Modal.component";
import IconSelector from "./iconSelector.component";

type IconSearcherProps = {
  selected: (icon: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

const IconSearcher = ({ selected, isOpen, onClose }: IconSearcherProps) => {
  return (
    // <Dialog
    //   header="Icono de categoría"
    //   visible
    //   style={{ width: "50vw" }}
    //   onHide={onHideModal}
    // >
    <Modal isOpen={isOpen} onClose={onClose} title="Iconos">
      <IconSelector selected={selected} onHideModal={onClose} />
    </Modal>
    // </Dialog>
  );
};

export default IconSearcher;
