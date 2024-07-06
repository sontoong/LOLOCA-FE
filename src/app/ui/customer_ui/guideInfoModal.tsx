import { Typography } from "antd";
import { Link } from "react-router-dom";
import { TourGuide } from "../../models/tourGuide";
import { Avatar } from "../../components/avatar";
import { genderGenerator } from "../../utils/generators/gender";

const GuideInfoModal = ({ guide }: { guide: TourGuide & { id?: string } }) => {
  const { Title, Paragraph } = Typography;

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-[50%]">
          <Avatar
            size={195}
            src={guide.avatar}
            className="h-[10rem] w-[10rem] rounded-full object-cover"
          />
          <Title level={2} style={{ fontWeight: "bolder", color: "#004AAD" }}>
            {`${guide.firstName} ${guide.lastName}`}
          </Title>
        </div>
        <div className="w-[50%] font-bold">
          <Title level={2} style={{ fontWeight: "bolder", color: "#004AAD" }}>
            Information
          </Title>
          <div className="flex justify-between">
            <div className="w-[50%]">
              <Paragraph>ID:</Paragraph>
              <Paragraph>Fullname:</Paragraph>
              <Paragraph>Gender:</Paragraph>
              <Paragraph>Languages:</Paragraph>
            </div>
            <div>
              <Paragraph>{guide.id}</Paragraph>
              <Paragraph>{`${guide.firstName} ${guide.lastName}`}</Paragraph>
              <Paragraph>{genderGenerator(guide.gender)}</Paragraph>
              <Paragraph>Vietnamese, English</Paragraph>
            </div>
          </div>
        </div>
      </div>
      <Paragraph>
        Please review the information and thank you for using our services. If
        you need any adjustments, please let me know!
      </Paragraph>
      <Link to="/" className="font-bold text-[#FFDE59] underline">
        Check your request !!
      </Link>
    </div>
  );
};

export default GuideInfoModal;
