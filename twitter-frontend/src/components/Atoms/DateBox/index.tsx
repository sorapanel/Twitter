import { useState, useEffect, useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export type DataBoxLabel = "月" | "日" | "年";

export type DateBoxProps = {
  label: DataBoxLabel;
  hasError?: boolean;
  onClick?: () => void;
  onChange?: (value: string) => void;
};

const DateBox = ({
  label,
  hasError = false,
  onClick,
  onChange,
}: DateBoxProps) => {
  const [isClick, setIsClick] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  let month: string[] = [];
  let day: string[] = [];
  let year: string[] = [];

  // 月（1〜12月）を格納
  for (let m = 1; m <= 12; m++) {
    month.push(m.toString() + "月"); // 2桁の文字列に変換
  }

  // 日（1〜31日）を格納
  for (let d = 1; d <= 31; d++) {
    day.push(d.toString()); // 2桁の文字列に変換
  }

  // 年（現在の年から120年前まで）を格納
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= currentYear - 120; y--) {
    year.push(y.toString());
  }

  const handleClick = () => {
    setIsClick(!isClick);
    onClick && onClick();
  };

  const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
    //テキストボックス以外をクリックしたときにisClickをfalse
    if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
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
      <div
        ref={rootRef}
        onClick={handleClick}
        className={`relative h-12 ${label === "月" ? "w-48" : ""} ${
          label === "日" ? "w-24" : ""
        } ${label === "年" ? "w-32" : ""} rounded border focus:outline-none ${
          isClick ? "border-blue-400" : "border-gray-200 "
        } ${hasError ? "!border-red-600" : ""}`}
      >
        <p
          className={`absolute top-1 left-1 text-sm ${
            isClick ? "text-blue-400" : "text-gray-400 "
          } ${hasError ? "!text-red-600" : ""}`}
        >
          {label}
        </p>
        <div className="absolute right-0 top-2">
          <ExpandMoreIcon
            color={`${isClick ? "primary" : "disabled"}`}
            fontSize="large"
          />
        </div>
        {isClick && label === "月" && (
          <div
            className="absolute w-full border border-2 rounded"
            style={{ top: "-18.5rem" }}
          >
            {month.map((m) => (
              <>
                <p
                  className={
                    " z-50 border text-gray-400 bg-white hover:bg-blue-400 hover:border-blue-400 hover:text-white"
                  }
                >
                  {m}
                </p>
                {/* ダミーインプット */}
                <input
                  type="hidden"
                  name={label}
                  value={m}
                  onChange={() => onChange && onChange(m)}
                />
              </>
            ))}
          </div>
        )}
        {isClick && label === "日" && (
          <div
            className="absolute w-full overflow-y-auto border border-2 rounded"
            style={{ maxHeight: "29rem", top: "-28.3rem" }}
          >
            {day.map((d) => (
              <>
                <p
                  className={
                    " z-50 border text-gray-400 bg-white hover:bg-blue-400 hover:border-blue-400 hover:text-white"
                  }
                >
                  {d}
                </p>
                {/* ダミーインプット */}
                <input
                  type="hidden"
                  name={label}
                  value={d}
                  onChange={() => onChange && onChange(d)}
                />
              </>
            ))}
          </div>
        )}
        {isClick && label === "年" && (
          <div
            className="absolute w-full overflow-y-auto border border-2 rounded"
            style={{ maxHeight: "29rem", top: "-28.3rem" }}
          >
            {year.map((y) => (
              <>
                <p
                  className={
                    " z-50 border text-gray-400 bg-white hover:bg-blue-400 hover:border-blue-400 hover:text-white"
                  }
                >
                  {y}
                </p>
                {/* ダミーインプット */}
                <input
                  type="hidden"
                  name={label}
                  value={y}
                  onChange={() => onChange && onChange(y)}
                />
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DateBox;
