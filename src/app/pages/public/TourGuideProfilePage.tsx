import { Banner } from "../../components/banner";
import { Col, Row, Typography } from "antd";
import { Divider } from "../../components/divider";
import { PrimaryButton } from "../../components/buttons";
import {
  FacebookFilled,
  InstagramFilled,
  StarFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";
import { formatDateToLocal } from "../../utils/utils";
import { useTourGuide } from "../../hooks/useTourGuide";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTour } from "../../hooks/useTour";
import { genderGenerator } from "../../utils/generators/gender";
import { Image } from "../../components/image";
import { CardListGrid } from "../../components/grids";
import { CardSkeleton, Skeleton } from "../../components/skeletons";
import { Avatar } from "../../components/avatar";
import { useFeedback } from "../../hooks/useFeedback";
import { Card } from "../../components/card";

const { Title, Paragraph, Text } = Typography;

const TourGuideProfile = () => {
  const navigate = useNavigate();
  const { tourGuideId } = useParams();
  const { state: stateTourGuide, handleGetTourGuideById } = useTourGuide();
  const { state: stateTour, handleGetTourByTourGuide } = useTour();
  const { state: stateFeedback, handleGetTourGuideFeedback } = useFeedback();

  useEffect(() => {
    if (tourGuideId) {
      handleGetTourGuideById({ tourGuideId: tourGuideId });
      handleGetTourByTourGuide({
        TourGuideId: tourGuideId,
        page: 1,
        pageSize: 10,
      });
    }
  }, [handleGetTourByTourGuide, handleGetTourGuideById, tourGuideId]);

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
                    title={item.name}
                    description={item.description}
                    className="h-[400px] w-80 flex-shrink-0"
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
                  />
                );
              }
            }}
          />
        </div>
      );
    }
  };

  const renderSocialIcons = () => {
    return (
      <Paragraph>
        {stateTourGuide.currentTourguide.zaloLink ||
        stateTourGuide.currentTourguide.facebookLink ||
        stateTourGuide.currentTourguide.instagramLink ? (
          <Title level={3} style={{ color: "#004AAD", fontWeight: "bolder" }}>
            Socials
          </Title>
        ) : null}
        {stateTourGuide.currentTourguide.zaloLink && (
          <Link
            to={stateTourGuide.currentTourguide.zaloLink}
            className="mr-[1rem] text-white"
          >
            <FacebookFilled className="text-[2rem] transition-transform duration-300 hover:scale-125 hover:text-blue-500" />
          </Link>
        )}
        {stateTourGuide.currentTourguide.facebookLink && (
          <Link
            to={stateTourGuide.currentTourguide.facebookLink}
            className="mr-[1rem] text-white"
          >
            <TwitterCircleFilled className="text-[2rem] transition-transform duration-300 hover:scale-125 hover:text-blue-400" />
          </Link>
        )}
        {stateTourGuide.currentTourguide.instagramLink && (
          <Link
            to={stateTourGuide.currentTourguide.instagramLink}
            className="mr-[1rem] text-white"
          >
            <InstagramFilled className="text-[2rem] transition-transform duration-300 hover:scale-125 hover:text-pink-500" />
          </Link>
        )}
      </Paragraph>
    );
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
          <Banner
            image={stateTourGuide.currentTourguide.cover}
            height="20rem"
            boxShadow={false}
          />
          <div className="flex justify-evenly">
            <Paragraph className="mt-[2rem] w-[40%] text-lg">
              {stateTourGuide.currentTourguide.description}
              {renderSocialIcons()}
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
        <Title level={4} style={{ margin: 0 }}>
          Can't find your suitable tour?
        </Title>
        <PrimaryButton
          text="Book Custom Tour"
          className="ml-[1rem] mr-[5rem]"
          size="large"
          onClick={handleBooking}
        />
      </div>
      <div className="mb-5 flex justify-evenly">
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
                <Paragraph>City:</Paragraph>
              </div>
              <div>
                <Paragraph>{tourGuideId}</Paragraph>
                <Paragraph>{`${stateTourGuide.currentTourguide.firstName} ${stateTourGuide.currentTourguide.lastName}`}</Paragraph>
                <Paragraph>
                  {genderGenerator(stateTourGuide.currentTourguide.gender)}
                </Paragraph>
                <Paragraph>Vietnamese, English</Paragraph>
                <Paragraph>
                  {stateTourGuide.currentTourguide.cityName}
                </Paragraph>
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
                  <div
                    key={index}
                    className={`mt-[3rem] ${index === stateFeedback.currentFeedbackList.feedbacks.length - 1 ? "" : "mb-[3rem]"}`}
                  >
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
