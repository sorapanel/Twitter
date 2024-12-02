export type LogoSize = "sm" | "md" | "lg" | "xl";

export type LogoProps = {
  imgPath: string;
  imgSize?: LogoSize;
};

const Logo = ({ imgPath, imgSize = "md" }: LogoProps) => {
  return (
    <>
      <img
        src={imgPath}
        alt="TwitterLogo"
        className={`${imgSize === "sm" ? "h-10 w-10" : ""} ${
          imgSize === "md" ? "h-20 w-20" : ""
        } ${imgSize === "lg" ? "h-40 w-40" : ""}
           ${imgSize === "xl" && "lg:h-72 lg:w-72 h-10 w-10"}
        `}
      />
    </>
  );
};

export default Logo;
