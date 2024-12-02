export type ButtonSize = "md" | "lg";
export type ButtonColor = "blue" | "white";

export type ButtonProps = {
  size?: ButtonSize;
  text: string;
  btnColor: ButtonColor;
  borderColor: string;
  textColor: string;
  isBold: boolean;
  onClick?: () => void;
  isDeactive?: boolean;
  type?: boolean;
};

const Button = ({
  size = "md",
  text,
  btnColor,
  isBold,
  borderColor,
  textColor,
  onClick,
  isDeactive = false,
  type,
}: ButtonProps) => {
  return (
    <>
      <button
        type={type ? "submit" : undefined}
        disabled={isDeactive}
        style={{
          borderColor,
          border: `2px solid ${borderColor}`,
          width: `${size === "lg" && "26rem"}`,
        }}
        onClick={onClick}
        className={`${
          btnColor === "white"
            ? "bg-white hover:bg-gray-200"
            : "bg-blue-400 hover:bg-blue-600"
        } rounded-full ${size === "md" && "w-60 h-9"} ${
          size === "lg" && "h-12 w-64"
        } flex items-center justify-center ${
          isDeactive && btnColor === "white" && "!bg-gray-200"
        } ${isDeactive && btnColor === "blue" && "!bg-blue-600"}`}
      >
        <p
          style={{
            color: `${textColor}`,
            writingMode: "horizontal-tb",
          }}
          className={` ${isBold ? "font-bold" : ""} `}
        >
          {text}
        </p>
      </button>
    </>
  );
};

export default Button;
