import { Carousel } from "antd";
import { Image } from "../image";
import VietNamBanner from "../../../assets/banner.png";

function CustomCarousel<RecordType>({
  height = 500,
  items,
  render,
}: CustomCarouselProps<RecordType>) {
  if (Array.isArray(items)) {
    if (items.length === 0) {
      return <Image src={VietNamBanner} preview={true} />;
    }
    return (
      <Carousel arrows autoplay draggable infinite>
        {items.map((item, index) => (
          <div key={index} className={`w-full h-[${height}px]`}>
            {render(item)}
          </div>
        ))}
      </Carousel>
    );
  }
}

export default CustomCarousel;

type CustomCarouselProps<RecordType> = {
  height?: number;
  items: RecordType[] | number | undefined;
  render: (item?: RecordType) => React.ReactNode;
};
