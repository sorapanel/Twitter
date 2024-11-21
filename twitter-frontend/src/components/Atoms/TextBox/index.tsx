import { useState, useEffect, useRef } from "react";

export type TextBoxVariant = "text" | "password" | "email";

export type TextBoxProps = {
  placeholder: string;
  hasError?: boolean;
  variant?: TextBoxVariant;
  onClick?: () => void;
};

const TextBox = ({
  placeholder,
  hasError = false,
  variant = "text",
  onClick,
}: TextBoxProps) => {
  const [isClick, setIsClick] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsClick(!isClick);
    onClick && onClick();
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
        readOnly={!isClick}
        className={`px-2 py-3 w-72 rounded border focus:outline-none ${
          isClick ? "border-blue-400 placeholder-blue-400" : "border-gray-200 "
        } ${hasError ? "!border-red-600 !placeholder-red-600" : ""}`}
      />
    </>
  );
};

export default TextBox;
