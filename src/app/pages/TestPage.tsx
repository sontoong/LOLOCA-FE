import Banner from "../components/banner/banner";
import DefaultBanner from "../../assets/banner.png";

export default function TestPage() {
  return (
    <>
      <Banner
        image={DefaultBanner}
        title={"Viet Nam"}
        description={
          "Việt Nam, một đất nước tuy nhỏ nhưng đa dạng về văn hóa, phong cảnh và ẩm thực. Từ những dãy núi hùng vĩ đến những bãi biển tuyệt đẹp, Việt Nam là điểm đến hấp dẫn của du khách."
        }
      />
    </>
  );
}
