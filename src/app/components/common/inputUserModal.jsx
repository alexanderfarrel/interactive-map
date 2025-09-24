import { useState } from "react";
import Modal from "./modal";
import { toast } from "sonner";

export default function InputUserModal({ onClose }) {
  const [name, setName] = useState("");
  const [closed, setClosed] = useState(false);
  const handleSubmit = () => {
    const stored = localStorage.getItem("userData");
    setClosed(true);
    if (stored && stored != null && stored != "null") {
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...JSON.parse(stored), name })
      );
      return toast.success("Selamat datang " + name);
    }
    const data = {
      point: 0,
      answeredKuis: [],
      name,
    };
    localStorage.setItem("userData", JSON.stringify(data));
    return toast.success("Selamat datang " + name);
  };
  return (
    <>
      <Modal onClose={onClose} closed={closed} className="max-w-[300px]">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-orange-500">
            Selamat Datang di Peta Interaktif
          </h1>
          <p className="-mt-3 text-[14px]">
            Sebelum mulai masukkan nama kamu terlebih dahulu ya!{" "}
          </p>
          <input
            className="text-black outline-none px-2 py-1 rounded-lg"
            type="text"
            minLength={3}
            maxLength={15}
            placeholder="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="self-end bg-orange-500 text-white px-2 py-1 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
}
