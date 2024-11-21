export type LogoSize = "sm" | "md" | "lg";

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
        } ${imgSize === "lg" ? "h-40 w-40" : ""}`}
      />
    </>
  );
};

export default Logo;
