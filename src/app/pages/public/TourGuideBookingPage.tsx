import { Steps } from "antd";
import { useEffect, useState } from "react";

import VietNamBanner from "../../../assets/banner.png";
import { PrimaryButton } from "../../components/buttons";
import { Card } from "../../components/card";
import { Form } from "../../components/form";
import GuideInfoModal from "../../ui/customer_ui/guideInfoModal";
import InstructionModal from "../../ui/customer_ui/instructionModal";
import TourGuideBookingInfo from "../../ui/customer_ui/tourGuideBookingInfo";
import { useTourGuide } from "../../hooks/useTourGuide";
import { useNavigate, useParams } from "react-router-dom";
import { useBookingTourGuide } from "../../hooks/useBookingTourGuide";

const { Step } = Steps;

const TourGuideBookingPage = () => {
  const navigate = useNavigate();
  const { tourGuideId } = useParams();
  const { state: stateTourGuide, handleGetTourGuideById } = useTourGuide();
  const { state: stateBookingTourGuide, handleCreateBookingTourGuide } =
    useBookingTourGuide();
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [mainForm] = Form.useForm();

  useEffect(() => {
    if (tourGuideId) {
      handleGetTourGuideById({ tourGuideId: tourGuideId });
    }
  }, [handleGetTourGuideById, tourGuideId]);

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    {
      title: "Instructions",
      content: <InstructionModal />,
    },
    {
      title: "Booking Information",
      content: (
        <TourGuideBookingInfo
          form={form}
          tourGuide={stateTourGuide.currentTourguide}
        />
      ),
    },
    {
      title: "Tour Guide Information",
      content: (
        <GuideInfoModal
          guide={{ ...stateTourGuide.currentTourguide, id: tourGuideId }}
        />
      ),
    },
  ];

  const initialValues = {
    // tourName: "",
    note: "",
    startDate: "",
    endDate: "",
    numOfAdult: 0,
    numOfChild: 0,
    // tourType: [],
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form Values: ", values);
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    handleCreateBookingTourGuide(
      {
        ...values,
        customerId: userId,
        tourGuideId: tourGuideId ?? "",
      },
      navigate,
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url(${VietNamBanner})`,
        backgroundSize: "cover",
      }}
      className="h-full py-[2rem]"
    >
      <Card
        cardTitle="Create your tour"
        className="mx-auto w-[50%]"
        bordered={false}
      >
        <Steps current={currentStep} className="my-[5%]">
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>
        <Form.Provider
          onFormFinish={(name, { values, forms }) => {
            const { mainForm } = forms;
            if (name === "BookingForm") {
              mainForm.setFieldsValue({ ...values });
              next();
            }
          }}
        >
          <div>{steps[currentStep].content}</div>
          <Form
            initialValues={initialValues}
            name="mainForm"
            form={mainForm}
            onFinish={handleSubmit}
          >
            {/* <Form.Item name="tourName" noStyle /> */}
            <Form.Item name="note" noStyle />
            <Form.Item name="startDate" noStyle />
            <Form.Item name="endDate" noStyle />
            {/* <Form.Item name="arrivalTime" noStyle /> */}
            {/* <Form.Item name="departureTime" noStyle /> */}
            <Form.Item name="numOfAdult" noStyle />
            <Form.Item name="numOfChild" noStyle />
            {/* <Form.Item name="tourType" noStyle /> */}

            <div>
              <div className="mt-4 flex justify-end">
                {currentStep > 0 && (
                  <PrimaryButton
                    text="Previous"
                    className="mr-[1%]"
                    onClick={() => prev()}
                    disabled={stateBookingTourGuide.isSending}
                  />
                )}
                {currentStep < steps.length - 1 && currentStep != 1 && (
                  <PrimaryButton text="Next" onClick={() => next()} />
                )}
                {currentStep == 1 && currentStep < steps.length - 1 && (
                  <PrimaryButton text="Next" onClick={() => form.submit()} />
                )}
                {currentStep === steps.length - 1 && (
                  <PrimaryButton
                    text="Submit"
                    onClick={() => {
                      mainForm.submit();
                    }}
                    loading={stateBookingTourGuide.isSending}
                  />
                )}
              </div>
            </div>
          </Form>
        </Form.Provider>
      </Card>
    </div>
  );
};

export default TourGuideBookingPage;
