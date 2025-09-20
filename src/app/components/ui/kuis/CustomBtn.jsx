export default function BtnKuis({
  children,
  isClick = false,
  isAnswered = false,
  onClick = () => {},
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`w-8 h-10 border rounded-lg ${
        isAnswered ? "bg-orange-400" : ""
      } ${
        isClick
          ? "border-orange-500"
          : isAnswered
          ? "border-transparent"
          : "border-gray-600"
      }`}
    >
      {children}
    </button>
  );
}
