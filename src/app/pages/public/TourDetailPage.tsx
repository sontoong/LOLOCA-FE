import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTour } from "../../hooks/useTour";
import { Loader } from "../../components/loader/loader";
import NotFound from "../../components/not-found/not-found";
import { Typography, Row, Col, Steps, Carousel } from "antd";
import VietNamBanner from "../../../assets/banner.png";
import { PrimaryButton } from "../../components/buttons";
import { Divider } from "../../components/divider";
import { tourDetailData } from "../../utils/testData";
import { Table } from "../../components/table";
import { formatUnixToLocal } from "../../utils/utils";
import { StarFilled } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const TourDetailPage = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const { state: stateTour, handleGetTourById } = useTour();

  useEffect(() => {
    if (tourId) {
      handleGetTourById({ tourId });
    }
  }, [tourId, handleGetTourById]);

  const tour = stateTour.currentTour;

  if (stateTour.isFetching) {
    return <Loader />;
  }

  if (!tour) {
    return <NotFound />;
  }

  const priceData = tourDetailData.price.map((item, index) => ({
    key: index,
    amount: `From ${item.from} to ${item.to}`,
    adult: item.adult,
    child: item.child,
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
          <Paragraph className="font-extrabold text-[1.2rem]">
            Private Tour
          </Paragraph>
        </Col>
        <Col offset={1}>
          <Title level={3}>Tour Type</Title>
          <Paragraph className="font-extrabold text-[1.2rem]">
            Culture, History, Sightseeing
          </Paragraph>
        </Col>
        <Col offset={1}>
          <Title level={3}>Duration</Title>
          <Paragraph className="font-extrabold text-[1.2rem]">
            {tour.duration} hours
          </Paragraph>
        </Col>
        <Col offset={1}>
          <Title level={3}>Activity Level</Title>
          <Paragraph className="font-extrabold text-[1.2rem]">Easy</Paragraph>
        </Col>
        <Col offset={1}>
          <PrimaryButton text="Booking" className="px-[4rem]" />
        </Col>
      </Row>

      {tour.tourImgViewList && tour.tourImgViewList.length > 0 ? (
        <Carousel autoplay>
          {tour.tourImgViewList.map((imgUrl, index) => (
            <div key={index}>
              <img
                src={imgUrl}
                alt={`Image ${index + 1}`}
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <Carousel autoplay>
          <div>
            <img
              src={VietNamBanner}
              alt="Default Image 1"
              style={{
                width: "100%",
                marginBottom: "20px",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </div>
          <div>
            <img
              src={VietNamBanner} // You can replace this with another image URL for the second default image
              alt="Default Image 2"
              style={{
                width: "100%",
                marginBottom: "20px",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </div>
        </Carousel>
      )}
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
              description: <Paragraph>{tourDetailData.description}</Paragraph>,
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
                  {tourDetailData.highlights.map((highlight, index) => (
                    <Paragraph
                      key={index}
                      className="text-[1.2rem] flex items-center"
                    >
                      <span className="text-[2rem]">&#x2022;</span> {highlight}
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
              description: tourDetailData.itinerary.map((day, index) => (
                <div key={index}>
                  <Title level={3}>{day.day}</Title>
                  <Divider colorSplit="black" />
                  {day.activities.map((activity, activityIndex) => (
                    <Paragraph
                      key={activityIndex}
                      className="text-[1.2rem] flex items-center"
                    >
                      <span className="text-[2rem]">&#x2022;</span> {activity}
                    </Paragraph>
                  ))}
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
              description: tourDetailData.whatsIncluded.map((item, index) => (
                <Paragraph
                  key={index}
                  className="text-[1.2rem] flex items-center"
                >
                  - {item}
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
              description: tourDetailData.whatsExcluded.map((item, index) => (
                <Paragraph
                  key={index}
                  className="text-[1.2rem] flex items-center"
                >
                  - {item}
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
          <div>
            <Title style={{ color: "#004AAD", fontWeight: "bolder" }}>
              Tour Guide
            </Title>
            <Link to="/">
              <img
                src={VietNamBanner}
                className="rounded-full object-cover w-[10rem] h-[10rem]"
              />
              <Title style={{ fontWeight: "bolder" }} className="underline">
                Mark Zucc
              </Title>
            </Link>
          </div>
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
              {tourDetailData.reviews.stars} <StarFilled /> (
              {tourDetailData.reviews.amount} reviews)
            </Text>
            {tourDetailData.reviews.ratings.map((rating, index) => (
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
    </div>
  );
};

export default TourDetailPage;
