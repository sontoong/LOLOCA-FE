import { useEffect, useState } from "react";
import { Banner } from "../../components/banner";
import LolocaBanner from "../../../assets/loloca-banner.png";
import { Col, CollapseProps, Row, Space, Typography } from "antd";
import { Divider } from "../../components/divider";
import { Input } from "../../components/inputs";
import { PrimaryButton } from "../../components/buttons";
import { Collapse } from "../../components/collapse";
import TourPaymentDetail from "../../ui/customer_ui/tourPaymentDetail";
import TourGuidePaymentDetail from "../../ui/customer_ui/tourGuidePaymentDetail";
import { useOrder } from "../../hooks/useOrder";
import { useBookingTourGuide } from "../../hooks/useBookingTourGuide";
import { useBookingTour } from "../../hooks/useBookingTour";
import { useTour } from "../../hooks/useTour";
import { useTourGuide } from "../../hooks/useTourGuide";
import { useAuth } from "../../hooks/useAuth";
import { Skeleton } from "../../components/skeletons";
import { formatCurrency, formatDateToLocal } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state: stateOrder } = useOrder();
  const { state: stateTour, handleGetTourById } = useTour();
  const { state: stateTourGuide, handleGetTourGuidebyId } = useTourGuide();
  const { state: stateBookingTour, handleGetBookingTourById } =
    useBookingTour();
  const { state: stateBookingTourGuide, handleGetBookingTourGuideById } =
    useBookingTourGuide();
  const { state: stateAuth } = useAuth();
  const { Title, Paragraph } = Typography;
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!stateOrder.requestTour.id) {
      navigate("/customer/request");
    }
  }, [navigate, stateOrder.requestTour.id]);

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

  useEffect(() => {
    if (stateBookingTour.currentBookingTour.tourId) {
      handleGetTourById({
        tourId: stateBookingTour.currentBookingTour.tourId.toString(),
      });
    }
    if (stateBookingTourGuide.currentBookingTourGuide.tourGuideId) {
      handleGetTourGuidebyId({
        tourGuideId:
          stateBookingTourGuide.currentBookingTourGuide.tourGuideId.toString(),
      });
    }
  }, [
    handleGetTourById,
    handleGetTourGuidebyId,
    stateBookingTour.currentBookingTour.tourId,
    stateBookingTourGuide.currentBookingTourGuide.tourGuideId,
  ]);

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleBooking = () => {
    // Navigate to the booking confirmation page or handle booking logic here
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      showArrow: false,
      label: "Credit Card",
      children: <p></p>,
    },
    {
      key: "2",
      showArrow: false,
      label: "Momo",
      children: <p></p>,
    },
    {
      key: "3",
      showArrow: false,
      label: "VnPay",
      children: <p></p>,
    },
    {
      key: "4",
      showArrow: false,
      label: "Visa",
      children: <p></p>,
    },
  ];

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
              <div className="mb-[2rem] mt-[2rem] flex justify-end">
                {currentStep === 1 && (
                  <PrimaryButton text="Next" onClick={handleNext} />
                )}
                {currentStep === 2 && (
                  <>
                    <PrimaryButton
                      text="Back"
                      onClick={handleBack}
                      className="mr-[1rem]"
                    />
                    <PrimaryButton text="Booking" onClick={handleBooking} />
                  </>
                )}
              </div>
            </div>
          </>
        );

      case "tourGuide":
        if (stateBookingTourGuide.isFetching) {
          return <Skeleton />;
        }
        return (
          <div className="ml-[2rem] w-[20%]">
            <Title level={5} style={{ fontWeight: "bolder" }}>
              {stateTourGuide.currentTourguide.firstName}
            </Title>
            <Divider colorSplit="black" />
            <div>
              <div>
                <Row className="flex justify-between">
                  <Col className="font-light">
                    <Paragraph>Date:</Paragraph>
                    <Paragraph>Unit:</Paragraph>
                  </Col>
                  <Col className="text-right">
                    <Paragraph>
                      {formatDateToLocal(
                        stateBookingTourGuide.currentBookingTourGuide
                          .requestDate,
                      )}
                    </Paragraph>
                    <Paragraph>
                      {stateBookingTourGuide.currentBookingTourGuide.numOfChild}{" "}
                      x{" "}
                      {stateBookingTourGuide.currentBookingTourGuide
                        .numOfChild > 1
                        ? "Children"
                        : "Child"}
                      ,{" "}
                      {stateBookingTourGuide.currentBookingTourGuide.numOfAdult}{" "}
                      x{" "}
                      {stateBookingTourGuide.currentBookingTourGuide
                        .numOfAdult > 1
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
              <div className="mb-[2rem] mt-[2rem] flex justify-end">
                {currentStep === 1 && (
                  <PrimaryButton text="Next" onClick={handleNext} />
                )}
                {currentStep === 2 && (
                  <>
                    <PrimaryButton
                      text="Back"
                      onClick={handleBack}
                      className="mr-[1rem]"
                    />
                    <PrimaryButton text="Booking" onClick={handleBooking} />
                  </>
                )}
              </div>
            </div>
          </div>
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
          {currentStep === 1 && (
            <div>
              {stateOrder.requestTour.type === "tour" && (
                <TourPaymentDetail tourDetails={stateTour.currentTour} />
              )}
              {stateOrder.requestTour.type === "tourGuide" && (
                <TourGuidePaymentDetail
                  tourGuideDetails={stateTourGuide.currentTourguide}
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
                    I have understood and agreed to LOLOCA's general terms of
                    use and privacy policy.
                  </Paragraph>
                  <Paragraph className="bg-yellow-200 p-3 pr-40">
                    Please fill in accurate information. Once you have submitted
                    the information, you will not be able to change it
                  </Paragraph>
                </Space>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="h-[30rem]">
              <Title level={3} style={{ fontWeight: "bolder" }}>
                Payment
              </Title>
              <Divider colorSplit="black" />
              <Paragraph className="bg-blue-300 p-3 pr-40 text-blue-500">
                All your information will be encrypted, secured, and protected.
              </Paragraph>
              <Collapse colorBorder="white" items={items} />
            </div>
          )}
        </div>
        <div className="ml-[2rem] w-[20%]">{renderBookingInfo()}</div>
      </div>
    </>
  );
};

export default PaymentPage;
