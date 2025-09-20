import { useState } from "react";
import Modal from "./modal";
import { toast } from "sonner";

export default function RefreshModal({
  setOpenModal,
  handleClearLocalStorage,
}) {
  const [closed, setClosed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <>
      <Modal onClose={() => setOpenModal(false)} closed={closed}>
        <h1 className="text-bold mb-3">
          Anda yakin ingin refresh point dan mengulangi kuis?
        </h1>
        <div className="flex justify-end gap-3">
          <button
            disabled={isDisabled}
            className="px-2 py-1 bg-red-300 text-red-600  rounded-lg"
            onClick={() => {
              setIsDisabled(true);
              setClosed(true);
              toast.info("Refresh dibatalkan");
            }}
          >
            Tidak
          </button>
          <button
            disabled={isDisabled}
            className="px-2 py-1 bg-green-300 text-green-600  rounded-lg"
            onClick={() => {
              setIsDisabled(true);
              handleClearLocalStorage();
              setClosed(true);
              toast.success("Refresh Berhasil");
            }}
          >
            Ya
          </button>
        </div>
      </Modal>
    </>
  );
}
