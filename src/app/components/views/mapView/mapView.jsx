"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./mapViewInner"), { ssr: false });

export default MapView;
