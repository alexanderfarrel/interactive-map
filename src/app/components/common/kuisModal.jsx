import React, { useMemo, useState } from "react";
import Modal from "./modal";
import { toast } from "sonner";
import { useTransitionRouter } from "next-view-transitions";

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function KuisModal({
  onClose,
  question,
  option,
  answer,
  title,
  custQuestion,
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const shuffleOption = useMemo(() => shuffle(option), [option]);
  const [closed, setClosed] = useState(false);
  const router = useTransitionRouter();

  const handleSubmit = () => {
    if (userAnswer === null) {
      toast.info("pilih jawaban terlebih dahulu");
      return;
    }
    setIsDisabled(true);
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userAnswer === answer) {
      userData.point += 5;
      userData.answeredKuis.push(title);
      localStorage.setItem("userData", JSON.stringify(userData));
      toast.success("Jawaban kamu benar +5 point");
    } else {
      userData.answeredKuis.push(title);
      localStorage.setItem("userData", JSON.stringify(userData));
      toast.error("Jawaban kamu salah");
    }

    setTimeout(() => {
      setClosed(true);
      router.push("/", {
        onTransitionReady: PageAnimation,
      });
    }, 500);
    return;
  };
  return (
    <>
      <Modal
        onClose={onClose}
        className={"max-w-[500px] max-h-[85dvh] overflow-y-scroll"}
        closed={closed}
      >
        <div className="flex flex-col gap-5 select-none">
          <h1 className="font-bold text-orange-400 text-2xl -mb-5">
            Mini Quiz
          </h1>
          {custQuestion ? (
            question.map((item, index) => (
              <React.Fragment key={index}>
                {item.p && <p>{item.p}</p>}
                {item.l && (
                  <div className="pl-5 flex flex-col gap-1 -my-3">
                    {item.l.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))
          ) : (
            <p>{question}</p>
          )}
          <section className="flex flex-col gap-3 pl-3">
            {shuffleOption.map((item, index) => (
              <div className="flex gap-3 justify-start" key={index}>
                <input
                  type="radio"
                  name="option"
                  id={`option${index + 1}`}
                  checked={userAnswer === item.id}
                  value={item.id}
                  onChange={(e) => setUserAnswer(e.target.value)}
                />
                <label htmlFor={`option${index + 1}`}>{item.option}</label>
              </div>
            ))}
          </section>
          <div className="flex justify-between items-center">
            <p
              onClick={() => setUserAnswer(null)}
              className="text-blue-400 font-semibold cursor-pointer hover:text-blue-500"
            >
              Bersihkan Pilihan Saya
            </p>
            <button
              disabled={isDisabled}
              type="button"
              onClick={handleSubmit}
              className="bg-orange-500 px-4 py-1 rounded-lg hover:bg-orange-500/80"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </>
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
        transform: `scale(0.5)`,
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
        transform: `scale(1.5)`,
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
