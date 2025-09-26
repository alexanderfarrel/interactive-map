"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useWindowWidth from "@/src/app/components/utils/windowWidth";

export default function IntroChar({ userData, setPlayIntro }) {
  const [closed, setClosed] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const conversation = [
    {
      text: `Hai ${userData?.name}, selamat datang di aplikasi peta interaktif buatan siswa SMAN 1 Madiun!`,
      imageUrl: "student1_pose2",
      speaker: 1,
    },
    {
      text: `Wah, aplikasi apa ini kak?`,
      imageUrl: "student2_pose1",
      speaker: 2,
    },
    {
      text: `Ini aplikasi untuk belajar sejarah di tempat-tempat bersejarah daerah Trowulan dengan cara yang seru lewat gamifikasi.`,
      imageUrl: "student1_pose1",
      speaker: 1,
    },
    {
      text: `Oh jadi kita bisa sambil main sekaligus mengenal sejarah Trowulan ya kak?`,
      imageUrl: "student2_pose2",
      speaker: 2,
    },
    {
      text: `Betul banget! Bahkan ada kuisnya juga, kalau jawabannya benar kamu bisa dapat poin.`,
      imageUrl: "student1_pose3",
      speaker: 1,
    },
    {
      text: `Asik banget, jadi makin semangat belajarnya.`,
      imageUrl: "student2_pose3",
      speaker: 2,
    },
    {
      text: `Iya dong! Apalagi aplikasinya langsung terintegrasi dengan peta 2D, biar pengalaman belajarmu makin nyata.`,
      imageUrl: "student1_pose4",
      speaker: 1,
    },
    {
      text: `Mantap, kalau gitu aku mau langsung coba sekarang!`,
      imageUrl: "student2_pose4",
      speaker: 2,
    },
  ];

  const [mounted, setMounted] = useState(false);
  const [conversationIndex, setConversationIndex] = useState(0);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleNextClick = () => {
    if (conversationIndex < conversation.length - 1) {
      setDisabled(true);
      setConversationIndex(conversationIndex + 1);
      return setTimeout(() => {
        setDisabled(false);
      }, 500);
    } else {
      setClosed(true);
      return setTimeout(() => {
        setPlayIntro(false);
      }, 500);
    }
  };

  const currentConversation = conversation[conversationIndex];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: closed ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black/85 fixed left-0 top-0 w-full h-full z-[9999] flex items-end justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={conversationIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`absolute ${
              currentConversation.speaker % 2 ? "right-0" : "left-0"
            } -bottom-[100px] w-[350px] h-[550px]`}
          >
            <div className="w-full h-full relative">
              <Image
                className="w-full h-full"
                src={`/images/students/${currentConversation.imageUrl}.png`}
                alt=""
                width={400}
                height={400}
              />

              <motion.p
                key={`${conversationIndex}-text`}
                initial={{
                  opacity: 0,
                  x:
                    currentConversation.speaker % 2
                      ? windowWidth <= 665
                        ? "20%"
                        : "-30%"
                      : windowWidth <= 665
                      ? "-30%"
                      : "50%",
                  y: windowWidth <= 665 ? "-115%" : -70,
                }}
                animate={{
                  opacity: 1,
                  x:
                    windowWidth <= 665
                      ? "10%"
                      : currentConversation.speaker % 2
                      ? "-60%"
                      : "85%",
                  y: windowWidth <= 665 ? "-115%" : -55,
                }}
                exit={{
                  opacity: 0,
                  x:
                    currentConversation.speaker % 2
                      ? windowWidth <= 665
                        ? "20%"
                        : "-30%"
                      : windowWidth <= 665
                      ? "-10%"
                      : "50%",
                  y: windowWidth <= 665 ? "-115%" : -70,
                }}
                transition={{ duration: 0.4 }}
                className={`absolute top-0 left-0 ${
                  currentConversation.speaker % 2
                    ? "rounded-br-none bg-green-500"
                    : "rounded-bl-none bg-blue-500"
                } text-lg text-white px-4 py-2 rounded-2xl shadow-md max-w-[300px]`}
              >
                {currentConversation.text}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          disabled={disabled}
          onClick={handleNextClick}
          className={`absolute right-5 bottom-5 ${
            conversationIndex < conversation.length - 1
              ? "bg-orange-400"
              : "bg-green-500"
          } text-white px-4 py-[6px] rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed`}
        >
          {conversationIndex < conversation.length - 1 ? "Next" : "Mulai"}
        </button>
      </motion.div>
    </>
  );
}
