"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import CustomMarker from "../../ui/mapView/CustomMarker";
import { useEffect, useState } from "react";
import { toast } from "sonner";
// markersData.ts
export const markersData = [
  {
    position: [-7.542654523610722, 112.37449242476421],
    title: "Candi_Brahu",
    description: "Candi Brahu Description",
    imageUrl: "/images/location/Candi_Brahu.webp",
  },
  {
    position: [-7.543623544874425, 112.37804696693156],
    title: "Candi_Gentong",
    description: "Candi Gentong Description",
    imageUrl: "/images/location/Candi_Gentong.webp",
  },
  {
    position: [-7.570511088098386, 112.37953705349308],
    title: "Candi_Kedaton",
    description: "Candi Kedaton Description",
    imageUrl: "/images/location/Candi_Kedaton.webp",
  },
  {
    position: [-7.55814345814628, 112.3864523380962],
    title: "Candi_Minak_Djinggo",
    description: "Candi Minak Djinggo Description",
    imageUrl: "/images/location/Candi_Minak_Djinggo.webp",
  },
  {
    position: [-7.571616192542514, 112.40349950926073],
    title: "Candi_Tikus",
    description: "Candi Tikus Description",
    imageUrl: "/images/location/Candi_Tikus.webp",
  },
  {
    position: [-7.567516284666997, 112.39874596693164],
    title: "Gapura_Bajang_Ratu",
    description: "Gapura Bajang Ratu Description",
    imageUrl: "/images/location/Gapura_Bajang_Ratu.webp",
  },
  {
    position: [-7.54178314406193, 112.39102901110887],
    title: "Gapura_Wringin_Lawang",
    description: "Gapura Wringin Lawang Description",
    imageUrl: "/images/location/Gapura_Wringin_Lawang.webp",
  },
  {
    position: [-7.557842616743933, 112.38282064922353],
    title: "Kolam_Segaran",
    description: "Kolam Segaran Description",
    imageUrl: "/images/location/Kolam_Segaran.webp",
  },
  {
    position: [-7.555812156778069, 112.38507572460256],
    title: "Makam_Putri_Cempo",
    description: "Makam Putri Cempo Description",
    imageUrl: "/images/location/Makam_Putri_Cempo.webp",
  },
  {
    position: [-7.574918786813625, 112.37917653809626],
    title: "Makam_Tujuh_Troloyo",
    description: "Makam Tujuh Troloyo Description",
    imageUrl: "/images/location/Makam_Tujuh_Troloyo.webp",
  },
  {
    position: [-7.559909821296325, 112.3807205552866],
    title: "Museum_Majapahit",
    description: "Museum Majapahit Description",
    imageUrl: "/images/location/Museum_Majapahit.webp",
  },
  {
    position: [-7.5662693507604555, 112.37994569576713],
    title: "Pendopo_Agung",
    description: "Pendopo Agung Description",
    imageUrl: "/images/location/Pendopo_Agung.webp",
  },
  {
    position: [-7.550664185043978, 112.36950653809608],
    title: "Siti_Inggil",
    description: "Siti Inggil Description",
    imageUrl: "/images/location/Siti_Inggil.webp",
  },
  {
    position: [-7.570152527770687, 112.37877312425688],
    title: "Situs_Umpak_Sentonorejo",
    description: "Situs Umpak Sentonorejo Description",
    imageUrl: "/images/location/Situs_Umpak_Sentonorejo.webp",
  },
];

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
    const nextMarker = markersData.find((m, i) => {
      return (
        !userData?.answeredKuis?.includes(titleFormat(m.title)) && i > markerNow
      );
    });

    if (nextMarker) {
      map.flyTo(nextMarker.position, 15);
      setMarkerNow(markersData.indexOf(nextMarker));
    } else {
      setUserData(localStorage.getItem("userData"));
      const firstUnanswered = markersData.find((m) => {
        return !userData?.answeredKuis?.includes(titleFormat(m.title));
      });

      if (firstUnanswered) {
        map.flyTo(firstUnanswered.position, 15);
        setMarkerNow(markersData.indexOf(firstUnanswered));
      } else {
        toast.success("Semua kuis telah diselesaikan");
      }
    }
  };

  return (
    <button
      className="absolute right-2 top-2 z-[9999] bg-orange-400 text-white px-2 py-1"
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

      {markersData.map((m, i) => (
        <CustomMarker
          key={i}
          position={m.position}
          title={m.title}
          description={m.description}
          imageUrl={m.imageUrl}
          isActive={i === markerNow}
        />
      ))}
    </MapContainer>
  );
}
