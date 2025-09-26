"use client";
import "leaflet/dist/leaflet.css";
import MapView from "./components/views/mapView/mapView";
import Navbar from "./components/layout/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RefreshModal from "./components/common/refreshModal";
import InputUserModal from "./components/common/inputUserModal";
import IntroChar from "./components/ui/home/introChar";

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openInputUserModal, setOpenInputUserModal] = useState(false);
  const [playIntro, setPlayIntro] = useState(false);
  const router = useRouter();
  useEffect(() => {
    document.body.setAttribute("data-route", "/");

    const stored = localStorage.getItem("userData");
    if (stored && stored != null && stored != "null") {
      const parsing = JSON.parse(stored);
      if (!parsing.name || parsing.name == "") {
        setOpenInputUserModal(true);
      }
      setUserData(JSON.parse(stored));
      return;
    }
    const data = {
      point: 0,
      answeredKuis: [],
    };
    localStorage.setItem("userData", JSON.stringify(data));
    setUserData(data);
  }, [openInputUserModal]);

  const handleClearLocalStorage = () => {
    const data = {
      point: 0,
      answeredKuis: [],
    };
    localStorage.setItem("userData", JSON.stringify(data));
    setUserData(data);
    router.refresh();
    setOpenInputUserModal(true);
  };

  return (
    <>
      <Navbar isFixHeight custState={openInputUserModal} />
      <div className="w-full min-h-[100dvh] flex flex-col p-5 pb-0 relative">
        <div className="w-full h-full max-w-6xl mx-auto border-4 border-orange-400 mt-12 relative">
          <MapView />
        </div>
        <div className="flex justify-between my-auto items-center px-1">
          <p className="text-xl font-semibold text-white">
            Point : {userData?.point || 0}
          </p>
          <button
            className="px-2 py-1 bg-red-300 text-red-600 rounded-lg hover:bg-red-400"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Refresh Point
          </button>
        </div>
      </div>

      {openModal && (
        <RefreshModal
          setOpenModal={setOpenModal}
          handleClearLocalStorage={handleClearLocalStorage}
        />
      )}

      {openInputUserModal && (
        <InputUserModal
          onClose={() => setOpenInputUserModal(false)}
          setPlayIntro={setPlayIntro}
        />
      )}

      {playIntro && (
        <IntroChar userData={userData} setPlayIntro={setPlayIntro} />
      )}
    </>
  );
}
