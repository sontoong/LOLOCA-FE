import { Banner } from "../../components/banner";
import VietNamBanner from "../../../assets/banner.png";
import { Col, Row, Typography } from "antd";
import { Divider } from "../../components/divider";
import CarouselCard from "../../components/card/card-horizontal";
import { PrimaryButton } from "../../components/buttons";
import { StarFilled } from "@ant-design/icons";
import { formatUnixToLocal } from "../../utils/utils";
import { reviewsData, tourData } from "../../utils/testData";

const TourGuideProfile = () => {
  const { Title, Paragraph, Text} = Typography;

  return (
    <div>
      <Banner image={VietNamBanner} height="20rem" boxShadow={false} />
      <div className="flex justify-evenly">
      <Paragraph className="w-[40%] mt-[2rem] text-lg">
          Hello! I'm [Your Name], a passionate freelance tour guide with [X]
          years of experience in creating unforgettable travel experiences. I
          specialize in personalized tours that cater to individual interests,
          offering a unique perspective on local culture, history, and hidden
          gems. Whether you're looking for adventure, relaxation, or cultural
          immersion, I'm here to ensure your journey is memorable and enriching.
          Let's explore together!
        </Paragraph>
        <div className="mt-[-5rem] flex flex-col items-center">
          <img
            src={VietNamBanner}
            className="h-[15rem] w-[15rem] rounded-full object-cover"
            alt="VietNamBanner"
          />
          <Title level={1} style={{ fontWeight: "bolder", color: "#004AAD" }}>
            Mark Zucc
          </Title>
        </div>
      </div>
      <div className="flex justify-center">
          <div className="w-[80%]">
              <Divider colorSplit="black"/>
          </div>
      </div>
      <Title level={1} style={{ fontWeight: "bolder", color: "#004AAD", marginLeft:"5rem"}}>
        My Tours
      </Title>
      <CarouselCard data={tourData} />
      <div className="flex justify-end items-center my-[3rem]">
        <Title level={4}>Can't find your suitable tour</Title> 
        <PrimaryButton text="Booking" className="mr-[5rem] ml-[1rem]" size="large"/>
      </div>
      <div className="flex justify-evenly">
      <div className="font-bold w-[30%]">
          <Title level={2} style={{ fontWeight: "bolder", color: "#004AAD" }}>
            Information
          </Title>
          <div className="flex justify-between">
            <div>
              <Paragraph>ID:</Paragraph>
              <Paragraph>Fullname:</Paragraph>
              <Paragraph>Gender:</Paragraph>
              <Paragraph>Languages:</Paragraph>
            </div>
            <div>
              <Paragraph>LO161022</Paragraph>
              <Paragraph>Mark Zucc</Paragraph>
              <Paragraph>Male</Paragraph>
              <Paragraph>English, Malay</Paragraph>
            </div>
          </div>
        </div>
        <div>
            <Title
              style={{
                color: "#004AAD",
                fontWeight: "bolder",
                marginBottom: 0,
              }}
            >
              Recent Reviews
            </Title>
            <Text>
              {reviewsData.stars} <StarFilled /> (
              {reviewsData.amount} reviews)
            </Text>
            {reviewsData.ratings.map((rating, index) => (
              <div key={index} className="my-[3rem]">
                <Row>
                  <Col>
                    <img
                      src={VietNamBanner}
                      className="rounded-full object-cover w-[3rem] h-[3rem]"
                    />
                  </Col>
                  <Col className="ml-[0.5rem]">
                    <Paragraph
                      style={{ fontWeight: "bold", marginBottom: "0" }}
                    >
                      {rating.name}
                    </Paragraph>
                    <Paragraph>{formatUnixToLocal(rating.date)}</Paragraph>
                  </Col>
                  <Col offset={1}>
                    <Paragraph>
                      <StarFilled /> {rating.star}
                    </Paragraph>
                  </Col>
                </Row>
                <Paragraph>{rating.description}</Paragraph>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default TourGuideProfile;
