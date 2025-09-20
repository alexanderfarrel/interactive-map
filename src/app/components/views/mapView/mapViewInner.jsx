"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import CustomMarker from "../../ui/mapView/CustomMarker";

export default function MapViewInner() {
  return (
    <MapContainer
      center={[-7.54917353452402, 112.39208549664885]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "80dvh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CustomMarker
        position={[-7.542654523610722, 112.37449242476421]}
        title={"Candi_Brahu"}
        description={"Candi Brahu Description"}
        imageUrl={"/images/tes.png"}
      />
      <CustomMarker
        position={[-7.543623544874425, 112.37804696693156]}
        title={"Candi_Gentong"}
        description={"Candi Gentong Description"}
        imageUrl={"/images/tes.png"}
      />
      <CustomMarker
        position={[-7.570511088098386, 112.37953705349308]}
        title={"Candi_Kedaton"}
        description={"Candi Kedaton Description"}
        imageUrl={"/images/tes.png"}
      />
      <CustomMarker
        position={[-7.55814345814628, 112.3864523380962]}
        title={"Candi_Minak_Djinggo"}
        description={"Candi Minak Djinggo Description"}
        imageUrl={"/images/tes.png"}
      />
      <CustomMarker
        position={[-7.571616192542514, 112.40349950926073]}
        title={"Candi_Tikus"}
        description={"Candi Tikus Description"}
        imageUrl={"/images/tes.png"}
      />
      <CustomMarker
        position={[-7.567516284666997, 112.39874596693164]}
        title={"Gapura_Bajang_Ratu"}
        description={"Gapura Bajang Ratu Description"}
        imageUrl={"/images/tes.png"}
      />
      <CustomMarker
        position={[-7.54178314406193, 112.39102901110887]}
        title={"Gapura_Wringin_Lawang"}
        description={"Gapura Wringin Lawang Description"}
        imageUrl={"/images/tes.png"}
      />
      <CustomMarker
        position={[-7.557842616743933, 112.38282064922353]}
        title={"Kolam_Segaran"}
        description={"Kolam Segaran Description"}
        imageUrl={"/images/tes.png"}
      />
      <CustomMarker
        position={[-7.555812156778069, 112.38507572460256]}
        title={"Makam_Putri_Cempo"}
        description={"Makam Putri Cempo Description"}
        imageUrl={"/images/tes.png"}
      />
      <CustomMarker
        position={[-7.574918786813625, 112.37917653809626]}
        title={"Makam_Tujuh_Troloyo"}
        description={"Makam Tujuh Troloyo Description"}
        imageUrl={"/images/tes.png"}
      />
      <CustomMarker
        position={[-7.559909821296325, 112.3807205552866]}
        title={"Museum_Majapahit"}
        description={"Makam Tujuh Troloyo Description"}
        imageUrl={"/images/tes.png"}
      />
      <CustomMarker
        position={[-7.5662693507604555, 112.37994569576713]}
        title={"Pendopo_Agung"}
        description={"Pendopo Agung Description"}
        imageUrl={"/images/tes.png"}
      />
      <CustomMarker
        position={[-7.550664185043978, 112.36950653809608]}
        title={"Siti_Inggil"}
        description={"Siti Inggil Description"}
        imageUrl={"/images/tes.png"}
      />
      <CustomMarker
        position={[-7.570152527770687, 112.37877312425688]}
        title={"Situs_Umpak_Sentonorejo"}
        description={"Siti Inggil Description"}
        imageUrl={"/images/tes.png"}
      />
    </MapContainer>
  );
}
