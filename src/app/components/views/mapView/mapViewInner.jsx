"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import CustomMarker from "../../ui/mapView/CustomMarker";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import detailData from "../../data/detailData";

const titleFormat = (string) => {
  return string.split("_").join(" ");
};

function NextMarkerButton({ setMarkerNow, markerNow }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored && stored != null && stored != "null") {
      setUserData(JSON.parse(stored));
      return;
    }
    const data = {
      point: 0,
      answeredKuis: [],
    };
    localStorage.setItem("userData", JSON.stringify(data));
    setUserData(data);
  }, []);

  const map = useMap();
  const handleNextMarker = () => {
    const nextMarker = detailData.find((m, i) => {
      return (
        !userData?.answeredKuis?.includes(titleFormat(m.title)) && i > markerNow
      );
    });

    if (nextMarker) {
      map.flyTo(nextMarker.position, 15);
      setMarkerNow(detailData.indexOf(nextMarker));
    } else {
      setUserData(localStorage.getItem("userData"));
      const firstUnanswered = detailData.find((m) => {
        return !userData?.answeredKuis?.includes(titleFormat(m.title));
      });

      if (firstUnanswered) {
        map.flyTo(firstUnanswered.position, 15);
        setMarkerNow(detailData.indexOf(firstUnanswered));
      } else {
        toast.success("Semua kuis telah diselesaikan");
      }
    }
  };

  return (
    <button
      className="absolute right-2 top-2 z-[999] bg-orange-400 text-white px-2 py-1"
      onClick={handleNextMarker}
    >
      Next Marker
    </button>
  );
}

export default function MapViewInner() {
  const [markerNow, setMarkerNow] = useState(null);
  return (
    <MapContainer
      center={[-7.555075736806437, 112.3828618528339]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "80dvh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <NextMarkerButton setMarkerNow={setMarkerNow} markerNow={markerNow} />

      {detailData.map((m, i) => (
        <CustomMarker
          key={i}
          position={m.position}
          title={m.slug}
          isActive={i === markerNow}
        />
      ))}
    </MapContainer>
  );
}
