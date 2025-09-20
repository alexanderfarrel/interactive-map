import { useTransitionRouter } from "next-view-transitions";
import Image from "next/image";
import { Marker, Popup } from "react-leaflet";

export default function CustomMarker({
  position,
  imageUrl = "",
  title,
  description,
}) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const titleFormat = title.split("_").join(" ");
  const router = useTransitionRouter();
  const customIcon = userData?.answeredKuis?.includes(titleFormat)
    ? new L.Icon({
        iconUrl: "/images/greenLocation.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      })
    : new L.Icon({
        iconUrl: "/images/redLocation.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

  return (
    <Marker position={position} icon={customIcon}>
      <Popup className="w-[250px]">
        <div className="flex flex-col text-center justify-center max-w-[250px] w-full">
          {imageUrl !== "" && (
            <Image
              src={imageUrl}
              alt=""
              width={500}
              height={500}
              className="w-full h-full rounded-lg"
            />
          )}
          <h3 className="font-bold mt-2">{titleFormat}</h3>
          <button
            onClick={() =>
              router.push(`/detail/${title}`, {
                onTransitionReady: PageAnimation,
              })
            }
            className="bg-orange-500 text-white px-2 py-1 rounded-lg mt-2"
          >
            Detail
          </button>
        </div>
      </Popup>
    </Marker>
  );
}

const PageAnimation = () => {
  document.documentElement.animate(
    [
      {
        transform: `scale(1)`,
        opacity: 1,
      },
      {
        transform: `scale(1.5)`,
        opacity: 0,
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        transform: `scale(0.5)`,
        opacity: 0,
      },
      {
        transform: `scale(1)`,
        opacity: 1,
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
};
