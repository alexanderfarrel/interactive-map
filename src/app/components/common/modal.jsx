import { useCallback, useEffect, useRef, useState } from "react";

export default function Modal({
  children,
  onClose,
  closed,
  intro = false,
  addFnc,
  className,
  disableClose = false,
}) {
  const [close, setClose] = useState(false);
  const timeoutRef = useRef();
  const ref = useRef();
  const handleClose = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      if (typeof addFnc === "function") {
        addFnc();
      }
      onClose();
    }, 300);
    setClose(true);
  }, [addFnc, onClose, timeoutRef]);

  useEffect(() => {
    if (closed) {
      handleClose();
    }
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (disableClose && closed == false) return;
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearTimeout(timeoutRef.current);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closed, handleClose, onClose, timeoutRef]);
  return (
    <div
      className={`fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-black/85 z-[9999] ${
        intro ? "animate-fadeInIntro" : "animate-fadeIn"
      } ${close ? "animate-fadeOut" : ""}`}
    >
      <div
        className={`bg-neutral-700 p-4 mx-2 rounded-xl animate-popUp ${className}`}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
