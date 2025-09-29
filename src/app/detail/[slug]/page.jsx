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
        <div className="fixed top-0 left-0 w-full h-full opacity-10 z-[-10]">
          <Image
            src={`/images/location/${slug}.webp`}
            className="w-full h-full"
            width={1000}
            height={1000}
            alt="Candi Brahu"
          />
        </div>
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
          <section className="text-lg flex flex-col gap-7 md:max-w-[85%] w-full self-start sm_:text-base">
            {data[0].article.map((item, index) => (
              <React.Fragment key={index}>
                {item.p && (
                  <p
                    className="whitespace-pre-wrap max-w-full -mt-2"
                    dangerouslySetInnerHTML={{ __html: item.p }}
                  />
                )}
                {item.title && (
                  <p
                    className="whitespace-pre-wrap max-w-full -mt-3"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                )}
                {item.sub && (
                  <p
                    className="pl-9  -mt-6 max-w-full"
                    dangerouslySetInnerHTML={{ __html: item.sub }}
                  />
                )}
                {item.l && (
                  <div className="flex flex-col gap-1 -my-3 pl-7">
                    {item.l.map((item, index) => (
                      <li
                        className={`list-outside list-disc my-1 ${
                          index == 0 && "-mt-1"
                        }`}
                        key={index}
                      >
                        {item}
                      </li>
                    ))}
                  </div>
                )}
                {item.i && (
                  <>
                    <Image
                      src={item.i.url}
                      alt=""
                      className="w-full rounded-xl max-w-[500px] mx-auto"
                      width={1000}
                      height={1000}
                    />
                    <p className="text-sm text-center -mt-3 italic">
                      {item.i.capt}
                    </p>
                  </>
                )}
                {item.c && (
                  <section className="flex flex-col gap-5 w-full">
                    {item.c.map((c, index) => {
                      if (c.speaker == 1) {
                        return (
                          <div
                            className="flex gap-2 items-center self-end"
                            key={index}
                          >
                            <p className="p-2 border-2 border-green-400 rounded-xl rounded-br-none ml-16">
                              {c.text}
                            </p>
                            <Image
                              src="/images/students/student1_pp.png"
                              alt=""
                              className="rounded-full w-16 h-16 object-contain"
                              width={100}
                              height={100}
                            />
                          </div>
                        );
                      }
                      if (c.speaker == 2) {
                        return (
                          <div className="flex gap-2 items-center" key={index}>
                            <Image
                              src="/images/students/student2_pp.png"
                              alt=""
                              className="rounded-full w-16 h-16 object-contain"
                              width={100}
                              height={100}
                            />
                            <p className="p-2 border-2 border-blue-400 rounded-xl rounded-bl-none mr-16">
                              {c.text}
                            </p>
                          </div>
                        );
                      }
                    })}
                  </section>
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
