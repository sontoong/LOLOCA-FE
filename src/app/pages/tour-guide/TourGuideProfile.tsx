import { Banner } from "../../components/banner";
import VietNamBanner from "../../../assets/banner.png";
import { Card, Col, Row, Typography } from "antd";
import { Divider } from "../../components/divider";
import { PrimaryButton } from "../../components/buttons";
import { StarFilled } from "@ant-design/icons";
import { formatUnixToLocal } from "../../utils/utils";
import { useTourGuide } from "../../hooks/useTourGuide";
import { useTour } from "../../hooks/useTour";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardListGrid } from "../../components/grids";
import { CardSkeleton } from "../../components/skeletons";
import { reviewsData } from "../../utils/testData";
import { Image } from "../../components/image";

const { Title, Paragraph, Text } = Typography;

const TourGuideProfile = () => {
  const { tourGuideId } = useParams();
  const navigate = useNavigate();
  const { state: stateTour, handleGetTourByTourGuide } = useTour();
  const { state: stateTourGuide, handleGetTourGuidebyId } = useTourGuide();

  useEffect(() => {
    if (tourGuideId) {
      handleGetTourByTourGuide({
        TourGuideId: parseInt(tourGuideId),
        page: 1,
        pageSize: 10,
      });
      handleGetTourGuidebyId({ tourGuideId: parseInt(tourGuideId) });
    }
  }, [handleGetTourByTourGuide, handleGetTourGuidebyId, tourGuideId]);

  const renderTours = () => {
    if (stateTour.isFetching) {
      return (
        <CardListGrid.Horizontal
          items={6}
          render={() => <CardSkeleton.ImageVertical />}
        />
      );
    }

    if (stateTour.currentTourList.tours) {
      return (
        <CardListGrid.Horizontal
          items={stateTour.currentTourList.tours}
          render={(item) => {
            if (item) {
              return (
                <Card
                  key={item.tourId}
                  className="h-96 w-80 flex-shrink-0"
                  hoverable
                  cover={
                    <Image
                      src={item.thumbnailTourImage}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                      }}
                      preview={false}
                    />
                  }
                  onClick={() => navigate(`/tours/${item.tourId}`)}
                >
                  <Title level={2} className="mt-0">
                    {item.name}
                  </Title>
                  <Paragraph ellipsis={{ rows: 3, expandable: false }}>
                    {item.description}
                  </Paragraph>
                </Card>
              );
            }
          }}
        />
      );
    }
  };

  return (
    <div>
      <Banner image={VietNamBanner} height="20rem" boxShadow={false} />
      <div className="flex justify-evenly">
        <Paragraph className="mt-[2rem] w-[40%] text-lg">
          {stateTourGuide.currentTourguide.description}
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
          <Divider colorSplit="black" />
        </div>
      </div>
      <div className="my-[3rem] flex items-center justify-end">
        <PrimaryButton
          text="Edit Profile"
          className="ml-[1rem] mr-[5rem]"
          size="large"
        />
      </div>
      <Title
        level={1}
        style={{ fontWeight: "bolder", color: "#004AAD", marginLeft: "5rem" }}
      >
        My Tours
      </Title>
      {renderTours()}
      <div className="flex justify-evenly">
        <div className="w-[30%] font-bold">
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
            {reviewsData.stars} <StarFilled /> ({reviewsData.amount} reviews)
          </Text>
          {reviewsData.ratings.map((rating, index) => (
            <div key={index} className="my-[3rem]">
              <Row>
                <Col>
                  <img
                    src={VietNamBanner}
                    className="h-[3rem] w-[3rem] rounded-full object-cover"
                  />
                </Col>
                <Col className="ml-[0.5rem]">
                  <Paragraph style={{ fontWeight: "bold", marginBottom: "0" }}>
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
