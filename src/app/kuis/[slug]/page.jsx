"use client";
import React, { useState } from "react";
import BtnKuis from "../../components/ui/kuis/CustomBtn";

export default function Kuis({ params }) {
  const slug = params.slug;
  const slugFormat = slug.split("_").join(" ");
  const [number, setNumber] = useState(1);
  const handleNumberClick = (numb) => {
    setNumber(numb);
  };
  return (
    <>
      <main className="w-full h-full mx-auto md:mt-10 mt-3 p-4">
        <h1 className="text-3xl font-bold md:mb-16 mb-8 text-center mt-5">
          Kuis {slugFormat}
        </h1>
        <div className="flex gap-4 max-w-[1000px] mx-auto flex-col md:flex-row">
          <section className="md:w-3/4 w-full max-w-[600px]">
            <h1 className="text-lg font-semibold">
              Pertanyaan Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Consectetur, sapiente. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. recusandae vero?
            </h1>
            <section className="flex flex-col gap-3 mt-5 pl-3">
              <div className="flex gap-3 justify-start">
                <input type="radio" name="option" id="option1" value={"A"} />
                <label for="option1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur, sapiente.
                </label>
              </div>
              <div className="flex gap-3 justify-start">
                <input type="radio" name="option" id="option2" value={"B"} />
                <label for="option2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur, sapiente.
                </label>
              </div>
              <div className="flex gap-3 justify-start">
                <input type="radio" name="option" id="option3" value={"C"} />
                <label for="option3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur, sapiente.
                </label>
              </div>
              <div className="flex gap-3 justify-start">
                <input type="radio" name="option" id="option4" value={"D"} />
                <label for="option4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur, sapiente.
                </label>
              </div>
            </section>
          </section>{" "}
          <aside className="md:w-1/4 w-full flex flex-col gap-5 mx-auto md:mt-0 mt-5">
            <div className="rounded-xl self-start p-3 flex gap-2 flex-wrap w-full shadow-custom">
              {Array.from({ length: 5 }).map((_, index) => (
                <React.Fragment key={index + 1}>
                  <BtnKuis
                    isClick={index + 1 === number}
                    onClick={() => handleNumberClick(index + 1)}
                  >
                    {index + 1}
                  </BtnKuis>
                </React.Fragment>
              ))}
            </div>
            <button className="bg-orange-500 p-2 rounded-lg">
              Selesaikan Kuis
            </button>
          </aside>
        </div>
      </main>
    </>
  );
}
