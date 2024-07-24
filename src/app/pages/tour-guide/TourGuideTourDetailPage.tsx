import { StarFilled } from "@ant-design/icons";
import { Col, Modal, Row, Steps, Typography } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar } from "../../components/avatar";
import { PrimaryButton } from "../../components/buttons";
import { Divider } from "../../components/divider";
import NotFound from "../../components/not-found/not-found";
import { Table } from "../../components/table";
import { useFeedback } from "../../hooks/useFeedback";
import { useTour } from "../../hooks/useTour";
import { useTourGuide } from "../../hooks/useTourGuide";
import { formatCurrency, formatDateToLocal } from "../../utils/utils";
import { Carousel } from "../../components/carousel";
import { Image } from "../../components/image";
import { Skeleton } from "../../components/skeletons";

const { Title, Paragraph, Text } = Typography;

const TourGuideTourDetailPage = () => {
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const { tourId } = useParams<{ tourId: string }>();
  const { state: stateTour, handleGetTourById, handleDeleteTour } = useTour();
  const { state: stateFeedback, handleGetTourFeedback } = useFeedback();
  const { state: stateTourGuide, handleGetTourGuideById } = useTourGuide();

  useEffect(() => {
    if (tourId) {
      handleGetTourById({ tourId });
      handleGetTourFeedback({ tourId });
    }
  }, [tourId, handleGetTourById, handleGetTourFeedback]);

  useEffect(() => {
    if (stateTour.currentTour?.tourGuideId) {
      handleGetTourGuideById({
        tourGuideId: stateTour.currentTour.tourGuideId,
      });
    }
  }, [handleGetTourGuideById, stateTour.currentTour?.tourGuideId]);

  const tour = stateTour.currentTour;

  if (stateTour.isFetching) {
    return (
      <div className="p-[2rem]">
        <Skeleton />
        <Skeleton.Image height={400} />
      </div>
    );
  }

  if (!tour) {
    return <NotFound />;
  }

  const priceData = tour.tourPriceDTOs?.map((item, index) => ({
    key: index,
    amount: `From ${item.totalTouristFrom} to ${item.totalTouristTo}`,
    adult: formatCurrency(item.adultPrice),
    child: formatCurrency(item.childPrice),
  }));

  const onDeleteTour = () => {
    modal.confirm({
      title: "Confirm Delete",
      content: `Are you sure you want to delete ${stateTour.currentTour.name}?`,
      onOk() {
        if (tourId) {
          handleDeleteTour({ tourId: tourId }, navigate);
        }
      },
    });
  };

  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Adult",
      dataIndex: "adult",
      key: "adult",
    },
    {
      title: "Child",
      dataIndex: "child",
      key: "child",
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="p-[2rem]">
        <Title level={1} style={{ fontWeight: "bolder" }}>
          {tour.name}
        </Title>
        <Row align="middle" className="mb-[2rem]">
          <Col>
            <Title level={3}>Tour Category</Title>
            <Text className="text-[1.2rem] font-extrabold">
              {tour.category}
            </Text>
          </Col>
          <Col offset={1}>
            <Title level={3}>Tour Type</Title>
            {tour.tourTypeDTOs?.map((typeDTO: any, index: number) => (
              <React.Fragment key={index}>
                <Text className="text-[1.2rem] font-extrabold ">
                  {typeDTO.typeDetail}
                </Text>
                {index !==
                  (tour.tourTypeDTOs ? tour.tourTypeDTOs.length - 1 : 0) && (
                  <span>, </span>
                )}
              </React.Fragment>
            ))}
          </Col>
          <Col offset={1}>
            <Title level={3}>Duration</Title>
            <Text className="text-[1.2rem] font-extrabold">
              {tour.duration} hours
            </Text>
          </Col>
          <Col offset={1}>
            <Title level={3}>Activity Level</Title>
            <Text className="text-[1.2rem] font-extrabold">Easy</Text>
          </Col>
          <Col offset={1} span={8}>
            <div className="flex justify-evenly">
              <PrimaryButton
                text="Edit Tour"
                className="px-[4rem]"
                onClick={() => navigate(`/guide/tour/edit/${tourId}`)}
              />
              <PrimaryButton
                text="Delete Tour"
                className="px-[4rem]"
                onClick={() => onDeleteTour()}
              />
            </div>
          </Col>
        </Row>
        <Carousel
          items={tour.tourImgViewList}
          render={(img) => (
            <Image
              src={img?.imagePath}
              preview={true}
              style={{
                objectFit: "contain",
              }}
              height={"500px"}
              width={"100%"}
            />
          )}
        />
        <div className="flex justify-between">
          <Steps
            progressDot
            current={7}
            direction="vertical"
            style={{ width: "60%" }}
            items={[
              {
                title: (
                  <Title
                    className="m-0"
                    style={{ color: "#004AAD", fontWeight: "bolder" }}
                  >
                    Description
                  </Title>
                ),
                description: (
                  <Paragraph className="text-[1.2rem]">
                    {tour.description}
                  </Paragraph>
                ),
              },
              {
                title: (
                  <Title
                    className="m-0"
                    style={{ color: "#FFDE59", fontWeight: "bolder" }}
                  >
                    Highlights
                  </Title>
                ),
                description: (
                  <div>
                    {tour.tourHighlightDTOs?.map((highlight, index) => (
                      <Paragraph
                        key={index}
                        className="flex items-center text-[1.2rem]"
                      >
                        <span className="text-[2rem]">&#x2022;</span>{" "}
                        {highlight.highlightDetail}
                      </Paragraph>
                    ))}
                  </div>
                ),
              },
              {
                title: (
                  <Title
                    className="m-0"
                    style={{ color: "#004AAD", fontWeight: "bolder" }}
                  >
                    Itinerary
                  </Title>
                ),
                description: tour.tourItineraryDTOs?.map((day, index) => (
                  <div key={index}>
                    <Title level={3}>{day.name}</Title>
                    <Divider colorSplit="black" />
                    {/* {day.activities.map((activity, activityIndex) => ( */}
                    <Paragraph className="flex items-center text-[1.2rem]">
                      <span className="text-[2rem]">&#x2022;</span>{" "}
                      {day.description}
                    </Paragraph>
                    {/* ))} */}
                  </div>
                )),
              },
              {
                title: (
                  <Title
                    className="m-0"
                    style={{ color: "#FFDE59", fontWeight: "bolder" }}
                  >
                    What's Included
                  </Title>
                ),
                description: tour.tourIncludeDTOs?.map((item, index) => (
                  <Paragraph
                    key={index}
                    className="flex items-center text-[1.2rem]"
                  >
                    - {item.includeDetail}
                  </Paragraph>
                )),
              },
              {
                title: (
                  <Title
                    className="m-0"
                    style={{ color: "#004AAD", fontWeight: "bolder" }}
                  >
                    What's Excluded
                  </Title>
                ),
                description: tour.tourExcludeDTOs?.map((item, index) => (
                  <Paragraph
                    key={index}
                    className="flex items-center text-[1.2rem]"
                  >
                    - {item.excludeDetail}
                  </Paragraph>
                )),
              },
              {
                title: (
                  <Title
                    className="m-0"
                    style={{ color: "#FFDE59", fontWeight: "bolder" }}
                  >
                    Price Details
                  </Title>
                ),
                description: (
                  <Table
                    dataSource={priceData}
                    columns={columns}
                    pagination={false}
                  />
                ),
              },
            ]}
          />
          <div className="w-[35%]">
            {stateTourGuide.currentTourguide ? (
              <div>
                <Title style={{ color: "#004AAD", fontWeight: "bolder" }}>
                  Tour Guide
                </Title>
                <Link to={`/guide/${stateTour.currentTour?.tourGuideId}`}>
                  <Avatar
                    size={160}
                    src={stateTourGuide.currentTourguide.avatar}
                  />
                  <Title style={{ fontWeight: "bolder" }} className="underline">
                    {`${stateTourGuide.currentTourguide.firstName} ${stateTourGuide.currentTourguide.lastName}`}
                  </Title>
                </Link>
              </div>
            ) : (
              <></>
            )}
            <Divider colorSplit="black" />
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
                {stateFeedback.currentFeedbackList.averageStar} <StarFilled /> (
                {stateFeedback.currentFeedbackList.totalFeedbacks} reviews)
              </Text>
              {stateFeedback.currentFeedbackList.feedbacks?.map(
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
                          {rating.customerId}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourGuideTourDetailPage;
