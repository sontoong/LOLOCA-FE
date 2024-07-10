import { Banner } from "../../components/banner";
import VietNamBanner from "../../../assets/banner.png";
import { Card, Col, Row, Typography } from "antd";
import { Divider } from "../../components/divider";
import { PrimaryButton } from "../../components/buttons";
import { StarFilled } from "@ant-design/icons";
import { formatDateToLocal } from "../../utils/utils";
import { useTourGuide } from "../../hooks/useTourGuide";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTour } from "../../hooks/useTour";
import { genderGenerator } from "../../utils/generators/gender";
import { Image } from "../../components/image";
import { CardListGrid } from "../../components/grids";
import { CardSkeleton, Skeleton } from "../../components/skeletons";
import { Avatar } from "../../components/avatar";
import { useFeedback } from "../../hooks/useFeedback";

const { Title, Paragraph, Text } = Typography;

const TourGuideProfile = () => {
  const navigate = useNavigate();
  const { tourGuideId } = useParams();
  const { state: stateTourGuide, handleGetTourGuidebyId } = useTourGuide();
  const { state: stateTour, handleGetTourByTourGuide } = useTour();
  const { state: stateFeedback, handleGetTourGuideFeedback } = useFeedback();

  useEffect(() => {
    if (tourGuideId) {
      handleGetTourGuidebyId({ tourGuideId: tourGuideId });
      handleGetTourByTourGuide({
        TourGuideId: tourGuideId,
        page: 1,
        pageSize: 10,
      });
    }
  }, [handleGetTourByTourGuide, handleGetTourGuidebyId, tourGuideId]);

  useEffect(() => {
    if (stateTourGuide.currentTourguide.cityId) {
      handleGetTourGuideFeedback({
        cityId: stateTourGuide.currentTourguide.cityId.toString(),
      });
    }
  }, [handleGetTourGuideFeedback, stateTourGuide.currentTourguide.cityId]);

  const handleBooking = () => {
    navigate(`booking`);
  };

  const renderTours = () => {
    if (stateTour.isFetching) {
      return (
        <div className="mx-20">
          <CardListGrid.Horizontal
            items={6}
            render={() => <CardSkeleton.ImageVertical />}
          />
        </div>
      );
    }

    if (stateTour.currentTourList.tours) {
      return (
        <div className="mx-20">
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
        </div>
      );
    }
  };

  const renderGeneralInfo = () => {
    if (stateTourGuide.isFetching) {
      return (
        <>
          <Skeleton.Image height={300} />
          <div className="flex justify-evenly">
            <div className="mt-[2rem] w-[40%] text-lg">
              <Skeleton.Paragraph paragraph={{ rows: 3 }} />
            </div>
            <div className="mt-[-5rem] flex flex-col items-center">
              <Skeleton.Avatar size={240} />
              <Skeleton.Paragraph title={true} paragraph={false} />
            </div>
          </div>
        </>
      );
    }

    if (stateTourGuide.currentTourguide) {
      return (
        <>
          <Banner image={VietNamBanner} height="20rem" boxShadow={false} />
          <div className="flex justify-evenly">
            <Paragraph className="mt-[2rem] w-[40%] text-lg">
              {stateTourGuide.currentTourguide.description}
            </Paragraph>
            <div className="mt-[-5rem] flex flex-col items-center">
              <Avatar size={240} src={stateTourGuide.currentTourguide.avatar} />
              <Title
                level={1}
                style={{ fontWeight: "bolder", color: "#004AAD" }}
              >
                {`${stateTourGuide.currentTourguide.firstName} ${stateTourGuide.currentTourguide.lastName}`}
              </Title>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div>
      {renderGeneralInfo()}
      <div className="flex justify-center">
        <div className="w-[80%]">
          <Divider colorSplit="black" />
        </div>
      </div>
      <Title
        level={1}
        style={{ fontWeight: "bolder", color: "#004AAD", marginLeft: "5rem" }}
      >
        My Tours
      </Title>
      {renderTours()}
      <div className="my-[3rem] flex items-center justify-end">
        <Title level={4}>Can't find your suitable tour</Title>
        <PrimaryButton
          text="Booking"
          className="ml-[1rem] mr-[5rem]"
          size="large"
          onClick={handleBooking}
        />
      </div>
      <div className="flex justify-evenly">
        <div className="w-[30%] font-bold">
          <Title level={2} style={{ fontWeight: "bolder", color: "#004AAD" }}>
            Information
          </Title>
          {stateTourGuide.isFetching ? (
            <Skeleton.Paragraph paragraph={{ rows: 4 }} />
          ) : (
            <div className="flex justify-between">
              <div>
                <Paragraph>ID:</Paragraph>
                <Paragraph>Fullname:</Paragraph>
                <Paragraph>Gender:</Paragraph>
                <Paragraph>Languages:</Paragraph>
              </div>
              <div>
                <Paragraph>{tourGuideId}</Paragraph>
                <Paragraph>{`${stateTourGuide.currentTourguide.firstName} ${stateTourGuide.currentTourguide.lastName}`}</Paragraph>
                <Paragraph>
                  {genderGenerator(stateTourGuide.currentTourguide.gender)}
                </Paragraph>
                <Paragraph>Vietnamese, English</Paragraph>
              </div>
            </div>
          )}
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

          {stateFeedback.isFetching ? (
            <>
              {Array(2)
                .fill({})
                .map((_, index) => (
                  <div key={index} className="my-[3rem]">
                    <Skeleton avatar paragraph />
                  </div>
                ))}
            </>
          ) : (
            <>
              <Text>
                {stateFeedback.currentFeedbackList.averageStar} <StarFilled /> (
                {`${stateFeedback.currentFeedbackList.totalFeedbacks}
                 reviews`}
                )
              </Text>
              {stateFeedback.currentFeedbackList.feedbacks.map(
                (rating, index) => (
                  <div key={index} className="my-[3rem]">
                    <Row>
                      <Col>
                        <Avatar size={48} />
                      </Col>
                      <Col className="ml-[0.5rem]">
                        <Paragraph
                          style={{ fontWeight: "bold", marginBottom: "0" }}
                        >
                          {rating.customerName}
                        </Paragraph>
                        <Paragraph>
                          {formatDateToLocal(rating.timeFeedback)}
                        </Paragraph>
                      </Col>
                      <Col offset={1}>
                        <Paragraph>
                          <StarFilled /> {rating.numOfStars}
                        </Paragraph>
                      </Col>
                    </Row>
                    <Paragraph>{rating.content}</Paragraph>
                  </div>
                ),
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourGuideProfile;
