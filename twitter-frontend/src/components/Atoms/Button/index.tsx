export type ButtonProps = {
  text: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  isBold: boolean;
  onClick?: () => void;
};

const Button = ({
  text,
  backgroundColor,
  isBold,
  borderColor,
  textColor,
  onClick,
}: ButtonProps) => {
  return (
    <>
      <button
        style={{
          backgroundColor,
          borderColor,
          border: `2px solid ${borderColor}`,
        }}
        onClick={onClick}
        className={"rounded-full w-64 h-9 flex items-center justify-center"}
      >
        <p
          style={{ color: `${textColor}` }}
          className={`sm:w-2 ${isBold ? "font-bold" : ""}`}
        >
          {text}
        </p>
      </button>
    </>
  );
};

export default Button;
