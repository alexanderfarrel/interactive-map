"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import KuisModal from "../../components/common/kuisModal";
import detailData from "../../components/data/detailData";
import Navbar from "../../components/layout/navbar";
import { toast } from "sonner";

export default function Detail({ params }) {
  const slug = params.slug;
  const slugFormat = slug.split("_").join(" ");
  const [progress, setProgress] = useState(0);
  const [openKuis, setOpenKuis] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState(null);

  const data = detailData.filter((item) => item.title === slugFormat);

  useEffect(() => {
    document.body.setAttribute("data-route", "/detail");

    setMounted(true);
    setUserData(JSON.parse(localStorage.getItem("userData")));
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const totalScroll = docHeight - windowHeight;
      const currentProgress = (scrollTop / totalScroll) * 100;

      setProgress(Math.min(Math.max(currentProgress, 0), 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openKuis ? "hidden" : "";
  }, [openKuis]);

  if (!mounted) return null;

  const handleKuis = () => {
    if (userData?.answeredKuis?.includes(slugFormat))
      return toast.info("Kuis Sudah Dikerjakan");
    setOpenKuis(true);
  };

  return (
    <>
      <Navbar isFixHeight />
      <div className="w-full h-full relative">
        <div
          className="fixed top-0 left-0 h-[4px] bg-orange-400 z-10"
          style={{ width: `${progress}%` }}
        ></div>
        <main className="flex flex-col items-center p-4 max-w-4xl mx-auto gap-6 mt-7">
          <h1 className="font-bold text-4xl mt-5">{slugFormat}</h1>
          <Image
            src={`/images/location/${slug}.webp`}
            alt=""
            width={1000}
            height={1000}
            className="w-full h-full rounded-xl shadow"
            unoptimized
          />
          <p className="text-orange-400 text-sm text-center">
            Selesaikan Membaca Untuk Mengerjakan Kuis dan Dapatkan Poin
          </p>
          <section className="text-lg flex flex-col gap-7 md:max-w-[85%] w-full self-start">
            {data[0].article.map((item, index) => (
              <React.Fragment key={index}>
                {item.p && <p className="sm_:text-base">{item.p}</p>}
                {item.l && (
                  <div className="flex flex-col gap-1 -my-3 pl-7">
                    {item.l.map((item, index) => (
                      <li
                        className="list-outside list-disc my-1 sm_:text-base"
                        key={index}
                      >
                        {item}
                      </li>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
            <button
              className="bg-orange-500 self-center px-4 py-[6px] rounded-xl mb-5 hover:bg-orange-500/80 sm_:text-base"
              onClick={handleKuis}
            >
              Kerjakan Kuis
            </button>
          </section>
        </main>
      </div>
      {openKuis && (
        <KuisModal
          onClose={() => setOpenKuis(false)}
          question={data[0].question}
          custQuestion={data[0]?.custQuestion || false}
          option={data[0].option}
          answer={data[0].answer}
          title={slugFormat}
        />
      )}
    </>
  );
}
