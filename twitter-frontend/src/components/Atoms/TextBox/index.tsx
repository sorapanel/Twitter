import { useState, useEffect, useRef } from "react";

export type TextBoxVariant = "text" | "password" | "email" | "tel";
export type TextBoxSize = "md" | "lg";

export type TextBoxProps = {
  size?: TextBoxSize;
  placeholder: string;
  hasError?: boolean;
  variant?: TextBoxVariant;
  onClick?: () => void;
  handleData?: (
    data: string,
    isEmpty: boolean,
    value?: string
  ) => void | Promise<void>; //サインインフォームにTextBoxの入力情報（空かどうか）を与える関数
};

const TextBox = ({
  size = "md",
  placeholder,
  hasError = false,
  variant = "text",
  onClick,
  handleData,
}: TextBoxProps) => {
  const [isClick, setIsClick] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsClick(true);
    onClick && onClick();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      handleData && handleData(placeholder, true, e.target.value);
    } else {
      handleData && handleData(placeholder, false, e.target.value);
    }
  };

  const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
    //テキストボックス以外をクリックしたときにisClickをfalse
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("touchend", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("touchend", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <input
        type={variant}
        ref={inputRef}
        placeholder={placeholder}
        onClick={handleClick}
        onChange={handleChange}
        readOnly={!isClick}
        className={`px-2 py-3 ${
          size === "md" ? "w-72" : "w-full"
        } rounded border focus:outline-none ${
          isClick ? "border-blue-400 placeholder-blue-400" : "border-gray-200 "
        } ${hasError ? "!border-red-600 !placeholder-red-600" : ""}`}
      />
    </>
  );
};

export default TextBox;
