import { Col, Row, Space, Typography } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LolocaBanner from "../../../assets/loloca-banner.png";
import { Banner } from "../../components/banner";
import { PrimaryButton } from "../../components/buttons";
import { Divider } from "../../components/divider";
import { Input } from "../../components/inputs";
import { Skeleton } from "../../components/skeletons";
import { useAuth } from "../../hooks/useAuth";
import { useBookingTour } from "../../hooks/useBookingTour";
import { useBookingTourGuide } from "../../hooks/useBookingTourGuide";
import { useOrder } from "../../hooks/useOrder";
import { useTour } from "../../hooks/useTour";
import { useTourGuide } from "../../hooks/useTourGuide";
import TourGuidePaymentDetail from "../../ui/customer_ui/tourGuidePaymentDetail";
import TourPaymentDetail from "../../ui/customer_ui/tourPaymentDetail";
import { formatCurrency, formatDateToLocal } from "../../utils/utils";

const PaymentPage = () => {
  const navigate = useNavigate();
  const {
    state: stateOrder,
    handleCreateOrderTour,
    handleCreateOrderTourGuide,
  } = useOrder();
  const { state: stateTour, handleGetTourById } = useTour();
  const { state: stateTourGuide, handleGetTourGuideById } = useTourGuide();
  const { state: stateBookingTour, handleGetBookingTourById } =
    useBookingTour();
  const { state: stateBookingTourGuide, handleGetBookingTourGuideById } =
    useBookingTourGuide();
  const { state: stateAuth } = useAuth();
  const { Title, Paragraph } = Typography;

  //prevent refresh
  useEffect(() => {
    if (!stateOrder.requestTour.id) {
      navigate("/customer/request");
    }
  }, [navigate, stateOrder.requestTour.id]);

  //fetch info left side
  useEffect(() => {
    if (stateBookingTour.currentBookingTour.tourId) {
      handleGetTourById({
        tourId: stateBookingTour.currentBookingTour.tourId.toString(),
      });
    }
    if (stateBookingTourGuide.currentBookingTourGuide.tourGuideId) {
      handleGetTourGuideById({
        tourGuideId:
          stateBookingTourGuide.currentBookingTourGuide.tourGuideId.toString(),
      });
    }
  }, [
    handleGetTourById,
    handleGetTourGuideById,
    stateBookingTour.currentBookingTour.tourId,
    stateBookingTourGuide.currentBookingTourGuide.tourGuideId,
  ]);

  //fetch info right side
  useEffect(() => {
    switch (stateOrder.requestTour.type) {
      case "tour":
        handleGetBookingTourById({ id: stateOrder.requestTour.id });
        break;

      case "tourGuide":
        handleGetBookingTourGuideById({ id: stateOrder.requestTour.id });
        break;

      default:
        break;
    }
  }, [
    handleGetBookingTourById,
    handleGetBookingTourGuideById,
    stateOrder.requestTour.id,
    stateOrder.requestTour.type,
  ]);

  const handleBooking = () => {
    switch (stateOrder.requestTour.type) {
      case "tour":
        handleCreateOrderTour(
          {
            bookingTourRequestsId: stateOrder.requestTour.id,
            paymentProvider: "",
            transactionCode: "",
          },
          navigate,
        );
        break;

      case "tourGuide":
        handleCreateOrderTourGuide(
          {
            bookingTourGuideRequestId: stateOrder.requestTour.id,
            paymentProvider: "",
            transactionCode: "",
          },
          navigate,
        );
        break;

      default:
        break;
    }
  };

  const renderBookingInfo = () => {
    switch (stateOrder.requestTour.type) {
      case "tour":
        if (stateBookingTour.isFetching) {
          return <Skeleton />;
        }
        return (
          <>
            <Title level={5} style={{ fontWeight: "bolder" }}>
              {stateTour.currentTour.name}
            </Title>
            <Divider colorSplit="black" />
            <div>
              <Row className="flex justify-between">
                <Col className="font-light">
                  <Paragraph>Date:</Paragraph>
                  <Paragraph>Unit:</Paragraph>
                </Col>
                <Col className="text-right">
                  <Paragraph>
                    {formatDateToLocal(
                      stateBookingTour.currentBookingTour.requestDate,
                    )}
                  </Paragraph>
                  <Paragraph>
                    {stateBookingTour.currentBookingTour.numOfChild} x{" "}
                    {stateBookingTour.currentBookingTour.numOfChild > 1
                      ? "Children"
                      : "Child"}
                    , {stateBookingTour.currentBookingTour.numOfAdult} x{" "}
                    {stateBookingTour.currentBookingTour.numOfAdult > 1
                      ? "Adults"
                      : "Adult"}
                  </Paragraph>
                </Col>
              </Row>
              <Divider colorSplit="black" />
              <Row className="flex justify-between">
                <Col className="font-light">Total:</Col>
                <Col className="font-bold">
                  {formatCurrency(
                    stateBookingTour.currentBookingTour.totalPrice,
                  )}
                </Col>
              </Row>
            </div>
          </>
        );

      case "tourGuide":
        if (stateBookingTourGuide.isFetching) {
          return <Skeleton />;
        }
        return (
          <>
            <Title level={5} style={{ fontWeight: "bolder" }}>
              {stateTourGuide.currentTourguide.firstName}
            </Title>
            <Divider colorSplit="black" />
            <div>
              <Row className="flex justify-between">
                <Col className="font-light">
                  <Paragraph>Date:</Paragraph>
                  <Paragraph>Unit:</Paragraph>
                </Col>
                <Col className="text-right">
                  <Paragraph>
                    {formatDateToLocal(
                      stateBookingTourGuide.currentBookingTourGuide.requestDate,
                    )}
                  </Paragraph>
                  <Paragraph>
                    {stateBookingTourGuide.currentBookingTourGuide.numOfChild} x{" "}
                    {stateBookingTourGuide.currentBookingTourGuide.numOfChild >
                    1
                      ? "Children"
                      : "Child"}
                    , {stateBookingTourGuide.currentBookingTourGuide.numOfAdult}{" "}
                    x{" "}
                    {stateBookingTourGuide.currentBookingTourGuide.numOfAdult >
                    1
                      ? "Adults"
                      : "Adult"}
                  </Paragraph>
                </Col>
              </Row>
              <Divider colorSplit="black" />
              <Row className="flex justify-between">
                <Col className="font-light">Total:</Col>
                <Col className="font-bold">
                  {formatCurrency(
                    stateBookingTourGuide.currentBookingTourGuide.totalPrice,
                  )}
                </Col>
              </Row>
            </div>
          </>
        );

      default:
        break;
    }
  };

  return (
    <>
      <Banner height="30rem" image={LolocaBanner} boxShadow={false} />
      <div className="mx-[2rem] flex justify-evenly">
        <div className="w-[60%]">
          {stateOrder.requestTour.type === "tour" && (
            <TourPaymentDetail
              tourDetails={stateTour.currentTour}
              loading={stateTour.isFetching}
            />
          )}
          {stateOrder.requestTour.type === "tourGuide" && (
            <TourGuidePaymentDetail
              tourGuideDetails={stateTourGuide.currentTourguide}
              loading={stateTourGuide.isFetching}
            />
          )}
          <div>
            <Title level={3} style={{ fontWeight: "bolder" }}>
              Personal Information
            </Title>
            <Divider colorSplit="black" />
            <Row gutter={[16, 16]} className="my-[2rem]">
              <Col span={12}>
                <Paragraph className="text-[1.1rem]">
                  <span className="font-bold">First Name:</span>{" "}
                  {stateAuth.currentUser.firstName}
                </Paragraph>
                <Paragraph className="text-[1.1rem]">
                  <span className="font-bold">Email:</span>{" "}
                  {stateAuth.currentUser.Email}
                </Paragraph>
                <Paragraph className="text-[1.1rem]">
                  <span className="font-bold">Phone:</span>{" "}
                  {stateAuth.currentUser.phoneNumber}
                </Paragraph>
              </Col>
              <Col span={12}>
                <Paragraph className="text-[1.1rem]">
                  <span className="font-bold">Last Name:</span>{" "}
                  {stateAuth.currentUser.lastName}
                </Paragraph>
              </Col>
            </Row>
          </div>
          <div>
            <Title level={3} style={{ fontWeight: "bolder" }}>
              Promo
            </Title>
            <Paragraph className="text-[1.1rem]">
              There are currently no promo code for this tour
            </Paragraph>
            <Divider colorSplit="black" />
            <Space direction="vertical">
              <Row>
                <Col>
                  <Input />
                </Col>
                <Col offset={1}>
                  <PrimaryButton text="Apply" />
                </Col>
              </Row>
              <Paragraph>
                I have understood and agreed to LOLOCA's general terms of use
                and privacy policy.
              </Paragraph>
              <Paragraph className="bg-yellow-200 p-3 pr-40">
                Please fill in accurate information. Once you have submitted the
                information, you will not be able to change it
              </Paragraph>
            </Space>
          </div>
        </div>
        <div className="ml-[2rem] w-[20%]">
          {renderBookingInfo()}
          <div className="mb-[2rem] mt-[2rem] flex justify-end">
            <PrimaryButton
              text="Pay with credit"
              onClick={handleBooking}
              disabled={stateTour.isFetching || stateBookingTour.isFetching}
              loading={stateOrder.isSending}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
