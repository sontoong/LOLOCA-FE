import { useState } from "react";
import { Banner } from "../../components/banner";
import LolocaBanner from "../../../assets/loloca-banner.png";
import { Col, CollapseProps, Row, Space, Typography } from "antd";
import { Divider } from "../../components/divider";
import { Input } from "../../components/inputs";
import { PrimaryButton } from "../../components/buttons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Collapse } from "../../components/collapse";
import TourPaymentDetail from "../../ui/customer_ui/tourPaymentDetail";
import TourGuidePaymentDetail from "../../ui/customer_ui/tourGuidePaymentDetail";

const PaymentPage = () => {
  const { Title, Paragraph } = Typography;
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { requestId } = useParams();

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  const tourDetails = {
    title: "Full-Day Private Tour Of Hanoi City's Highlights",
    description: `Explore the Old Quarter, French Quarter, and New Quarter of
                  Hanoi in one day with your Vietnamese guide. See the impressive
                  tower of the Tran Quoc pagoda, a local lacquer workshop, and the
                  Ho Chi Minh Mausoleum. Experience tranquillity at the Temple of
                  Literature, the Ngoc Son Temple at Hoan Kiem lake, and a
                  delicious local lunch in the city`,
    image: LolocaBanner,
  };

  const tourGuideDetails = {
    name: "Nguyen Van A",
    description: `I'm very cool`,
    image: LolocaBanner,
  };

  const personalInfo = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  };

  const bookingDetails = {
    date: "15/03/2023",
    numAdults: 2,
    numChildren: 3,
    total: "$200",
  };

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleBooking = () => {
    // Navigate to the booking confirmation page or handle booking logic here
    navigate(`/customer/booking-successful/${requestId}`);
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

  return (
    <>
      <Banner height="30rem" image={LolocaBanner} boxShadow={false} />
      <div className="mx-[2rem] flex justify-evenly">
        <div className="w-[60%]">
          {currentStep === 1 && (
            <div>
              {type === "tour" && <TourPaymentDetail tourDetails={tourDetails} />}
              {type === "tour-guide" && <TourGuidePaymentDetail tourDetails={tourGuideDetails} />}
              <div>
                <Title level={3} style={{ fontWeight: "bolder" }}>
                  Personal Information
                </Title>
                <Divider colorSplit="black" />
                <Row gutter={[16, 16]} className="my-[2rem]">
                  <Col span={12}>
                    <Paragraph className="text-[1.1rem]">
                      <span className="font-bold">First Name:</span>{" "}
                      {personalInfo.firstName}
                    </Paragraph>
                    <Paragraph className="text-[1.1rem]">
                      <span className="font-bold">Email:</span>{" "}
                      {personalInfo.email}
                    </Paragraph>
                    <Paragraph className="text-[1.1rem]">
                      <span className="font-bold">Phone:</span>{" "}
                      {personalInfo.phone}
                    </Paragraph>
                  </Col>
                  <Col span={12}>
                    <Paragraph className="text-[1.1rem]">
                      <span className="font-bold">Last Name:</span>{" "}
                      {personalInfo.lastName}
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
        <div className="ml-[2rem] w-[20%]">
          <Title level={5} style={{ fontWeight: "bolder" }}>
            {tourDetails.title}
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
                  <Paragraph>{bookingDetails.date}</Paragraph>
                  <Paragraph>
                    {bookingDetails.numChildren} x{" "}
                    {bookingDetails.numChildren > 1 ? "Children" : "Child"},{" "}
                    {bookingDetails.numAdults} x{" "}
                    {bookingDetails.numAdults > 1 ? "Adults" : "Adult"}
                  </Paragraph>
                </Col>
              </Row>
              <Divider colorSplit="black" />
              <Row className="flex justify-between">
                <Col className="font-light">Total:</Col>
                <Col className="font-bold">{bookingDetails.total}</Col>
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
      </div>
    </>
  );
};

export default PaymentPage;
