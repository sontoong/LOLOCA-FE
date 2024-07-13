import { Banner } from "../../components/banner";
import { Card, Col, Row, Typography } from "antd";
import { Divider } from "../../components/divider";
import { StarFilled } from "@ant-design/icons";
import { formatDateToLocal } from "../../utils/utils";
import { useTour } from "../../hooks/useTour";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardListGrid } from "../../components/grids";
import { CardSkeleton, Skeleton } from "../../components/skeletons";
import { Image } from "../../components/image";
import { Avatar } from "../../components/avatar";
import { genderGenerator } from "../../utils/generators/gender";
import { PrimaryButton } from "../../components/buttons";
import ProfileEditModal from "../../ui/guide_ui/profileEditModal";
import { useAuth } from "../../hooks/useAuth";
import { TourGuide } from "../../models/tourGuide";
import { useTourGuide } from "../../hooks/useTourGuide";
import { useFeedback } from "../../hooks/useFeedback";

const { Title, Paragraph, Text } = Typography;

const TourGuideProfile = () => {
  const navigate = useNavigate();
  const tourGuideId = localStorage.getItem("userId") ?? "";
  const { state: stateUser } = useAuth();
  const { state: stateTourGuide } = useTourGuide();
  const { state: stateTour, handleGetTourByTourGuide } = useTour();
  const { state: stateFeedback, handleGetTourGuideFeedback } = useFeedback();
  const currentUser = stateUser.currentUser as TourGuide;

  useEffect(() => {
    if (tourGuideId) {
      handleGetTourByTourGuide({
        TourGuideId: tourGuideId,
        page: 1,
        pageSize: 10,
      });
    }
  }, [tourGuideId, handleGetTourByTourGuide]);

  useEffect(() => {
    if (stateTourGuide.currentTourguide.cityId) {
      handleGetTourGuideFeedback({
        cityId: stateTourGuide.currentTourguide.cityId.toString(),
      });
    }
  }, [handleGetTourGuideFeedback, stateTourGuide.currentTourguide.cityId]);

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
          <Skeleton.Image height={325} />
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

    if (currentUser) {
      return (
        <>
          <Banner image={currentUser.cover} height="20rem" boxShadow={false} />
          <div className="flex justify-evenly">
            <Paragraph className="mt-[2rem] w-[40%] text-lg">
              {currentUser.description}
            </Paragraph>
            <div className="mt-[-5rem] flex flex-col items-center">
              <Avatar size={240} src={currentUser.avatar} />
              <Title
                level={1}
                style={{ fontWeight: "bolder", color: "#004AAD" }}
              >
                {`${currentUser.firstName} ${currentUser.lastName}`}
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
      <div className="mr-[5rem] flex justify-end">
        <ProfileEditModal
          tourGuideData={currentUser}
          tourGuideId={tourGuideId}
        />
        <PrimaryButton
          text="Create Tour"
          onClick={() => navigate("/guide/tour/create")}
        />
      </div>
      <Title
        level={1}
        style={{ fontWeight: "bolder", color: "#004AAD", marginLeft: "5rem" }}
      >
        My Tours
      </Title>
      {renderTours()}
      <div className="mb-5 flex justify-evenly">
        <div className="w-[30%] font-bold">
          <Title level={2} style={{ fontWeight: "bolder", color: "#004AAD" }}>
            Information
          </Title>
          {stateUser.isFetching ? (
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
                <Paragraph>{`${currentUser.firstName} ${currentUser.lastName}`}</Paragraph>
                <Paragraph>{genderGenerator(currentUser.gender)}</Paragraph>
                <Paragraph>Vietnamese, English</Paragraph>
              </div>
            </div>
          )}
        </div>
        <div className="mb-5">
          <Title
            style={{
              color: "#004AAD",
              fontWeight: "bolder",
              marginBottom: 0,
            }}
          >
            Recent Reviews
          </Title>

          {/* fix data */}
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
