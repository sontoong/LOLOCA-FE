import { Image, ImageProps } from "antd";
import { defaultImage } from "../../../constants/images";

function CustomImage(props: CustomImageProps) {
  const { src, ...rest } = props;
  return <Image src={src ?? "error"} fallback={defaultImage} {...rest} />;
}

export default CustomImage;

type CustomImageProps = Omit<ImageProps, "src" | "fallback"> & {
  src: ImageProps["src"] | null;
};
