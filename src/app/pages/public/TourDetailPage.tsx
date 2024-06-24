import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTour } from "../../hooks/useTour";
import { Loader } from "../../components/loader/loader";
import NotFound from "../../components/not-found/not-found";
import { Typography, Row, Col, Steps, Carousel } from "antd";
import VietNamBanner from "../../../assets/banner.png";
import { PrimaryButton } from "../../components/buttons";
import { Divider } from "../../components/divider";
import { Table } from "../../components/table";
import { formatDateToLocal } from "../../utils/utils";
import { StarFilled } from "@ant-design/icons";
import { Image } from "../../components/image";
import { useFeedback } from "../../hooks/useFeedback";
import { useTourGuide } from "../../hooks/useTourGuide";

const { Title, Paragraph, Text } = Typography;

const TourDetailPage = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const { state: stateTour, handleGetTourById } = useTour();
  const { state: stateFeedback, handleGetTourFeedback } = useFeedback();
  const { state: stateTourGuide, handleGetTourGuidebyId } = useTourGuide();

  useEffect(() => {
    if (tourId) {
      handleGetTourById({ tourId });
      handleGetTourFeedback({ tourId });
    }
  }, [tourId, handleGetTourById, handleGetTourFeedback]);

  useEffect(() => {
    if (stateTour.currentTour?.tourGuideId) {
      handleGetTourGuidebyId({
        tourGuideId: stateTour.currentTour.tourGuideId,
      });
    }
  }, [handleGetTourGuidebyId, stateTour.currentTour?.tourGuideId]);

  const tour = stateTour.currentTour;

  if (stateTour.isFetching) {
    return <Loader />;
  }

  if (!tour) {
    return <NotFound />;
  }

  const priceData = tour.tourPriceDTOs?.map((item, index) => ({
    key: index,
    amount: `From ${item.totalTouristFrom} to ${item.totalTouristTo}`,
    adult: item.adultPrice,
    child: item.childPrice,
  }));

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
    <div className="p-[2rem]">
      <Title level={1} style={{ fontWeight: "bolder" }}>
        {tour.name}
      </Title>
      <Row align="middle">
        <Col>
          <Title level={3}>Tour Category</Title>
          <Paragraph className="text-[1.2rem] font-extrabold">
            Private Tour
          </Paragraph>
        </Col>
        <Col offset={1}>
          <Title level={3}>Tour Type</Title>
          <Paragraph className="text-[1.2rem] font-extrabold">
            Culture, History, Sightseeing
          </Paragraph>
        </Col>
        <Col offset={1}>
          <Title level={3}>Duration</Title>
          <Paragraph className="text-[1.2rem] font-extrabold">
            {tour.duration} hours
          </Paragraph>
        </Col>
        <Col offset={1}>
          <Title level={3}>Activity Level</Title>
          <Paragraph className="text-[1.2rem] font-extrabold">Easy</Paragraph>
        </Col>
        <Col offset={1}>
          <PrimaryButton text="Booking" className="px-[4rem]" />
        </Col>
      </Row>
      <Carousel arrows autoplay draggable>
        {tour.tourImgViewList?.length ? (
          tour.tourImgViewList?.map((imgUrl, index) => (
            <Image
              key={index}
              src={imgUrl}
              alt={`Image ${index + 1}`}
              preview={true}
            />
          ))
        ) : (
          <Image src={VietNamBanner} preview={true} />
        )}
      </Carousel>
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
              description: <Paragraph>{tour.description}</Paragraph>,
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
              <Link to="/">
                <Image
                  src={stateTourGuide.currentTourguide.avatar}
                  className="h-[10rem] w-[10rem] rounded-full object-cover"
                />
                <Title style={{ fontWeight: "bolder" }} className="underline">
                  {stateTourGuide.currentTourguide.firstName}
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

            {/* fix data below */}
            <Text>
              {stateFeedback.currentFeedbackList.averageStar} <StarFilled /> (
              {stateFeedback.currentFeedbackList.totalFeedbacks} reviews)
            </Text>
            {stateFeedback.currentFeedbackList.feedbacks?.map(
              (rating, index) => (
                <div key={index} className="my-[3rem]">
                  <Row>
                    <Col>
                      <img
                        src={VietNamBanner}
                        className="h-[3rem] w-[3rem] rounded-full object-cover"
                      />
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
  );
};

export default TourDetailPage;
