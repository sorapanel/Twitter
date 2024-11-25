export type ShapeImageSize = "sm" | "md" | "lg";

export type ShapeImageProps = {
  imgPath: string;
  imgSize: ShapeImageSize;
};

const ShapeImage = ({ imgPath, imgSize = "sm" }: ShapeImageProps) => {
  return (
    <img
      src={imgPath}
      alt="ShapeImage"
      className={`rounded-full ${imgSize === "sm" ? "w-8 h-8" : ""} ${
        imgSize === "md" ? "w-24 h-24" : ""
      } ${imgSize === "lg" && "w-28 h-28"}`}
    />
  );
};

export default ShapeImage;
