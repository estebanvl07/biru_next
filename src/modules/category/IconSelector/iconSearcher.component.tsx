// import { Dialog } from "primereact/dialog";
import IconSelector from "./iconSelector.component";

type IconSearcherProps = {
  selected: (icon: string) => void;
  onHideModal: () => void;
};

const IconSearcher = ({ selected, onHideModal }: IconSearcherProps) => {
  return (
    // <Dialog
    //   header="Icono de categoría"
    //   visible
    //   style={{ width: "50vw" }}
    //   onHide={onHideModal}
    // >
      <div>

      <IconSelector selected={selected} onHideModal={onHideModal} />
      </div>
    // </Dialog>
  );
};

export default IconSearcher;
