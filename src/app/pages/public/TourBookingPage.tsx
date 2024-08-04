import { Steps } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

import VietNamBanner from "../../../assets/banner.png";
import { PrimaryButton } from "../../components/buttons";
import { ScreenCard } from "../../components/card";
import { Form } from "../../components/form";
import { useBookingTour } from "../../hooks/useBookingTour";
import { useProtectedAction } from "../../hooks/useProtectedAction";
import { useTour } from "../../hooks/useTour";
import { useTourGuide } from "../../hooks/useTourGuide";
import { isLoggedIn } from "../../redux/slice/authSlice";
import GuideInfoModal from "../../ui/customer_ui/guideInfoModal";
import InstructionModal from "../../ui/customer_ui/instructionModal";
import TourBookingInfoModal from "../../ui/customer_ui/tourBookingInfoModal";
import { dateToLocalISOString } from "../../utils/utils";

const { Step } = Steps;

const TourBookingPage = () => {
  const navigate = useNavigate();
  const { tourId } = useParams();
  const { state: stateTour, handleGetTourById } = useTour();
  const { state: stateTourGuide, handleGetTourGuideById } = useTourGuide();
  const { state: stateBookingTour, handleCreateBookingTour } = useBookingTour();
  const { executeOrRedirect } = useProtectedAction();
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [mainForm] = Form.useForm();

  useEffect(() => {
    if (tourId) {
      handleGetTourById({ tourId: tourId });
    }
  }, [tourId, handleGetTourById]);

  useEffect(() => {
    if (stateTour.currentTour.tourGuideId) {
      handleGetTourGuideById({
        tourGuideId: stateTour.currentTour.tourGuideId,
      });
    }
  }, [handleGetTourGuideById, stateTour.currentTour.tourGuideId]);

  const initialValues = {
    note: "",
    startDate: dayjs().add(1, "days"),
    endDate: dayjs(),
    numOfAdult: 0,
    numOfChild: 0,
    totalPrice: 0,
  };

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
      title: "Step 1",
      content: <InstructionModal />,
    },
    {
      title: "Step 2",
      content: (
        <TourBookingInfoModal
          form={form}
          tour={stateTour.currentTour}
          initialValues={initialValues}
          loading={stateTour.isFetching}
        />
      ),
    },
    {
      title: "Step 3",
      content: <GuideInfoModal guide={stateTourGuide.currentTourguide} />,
    },
  ];

  const handleSubmit = (values: typeof initialValues) => {
    const startDateString = dateToLocalISOString(values.startDate);
    const endDateString = dateToLocalISOString(values.endDate);
    const userId = localStorage.getItem("userId");

    executeOrRedirect({
      action: () =>
        handleCreateBookingTour(
          {
            ...values,
            startDate: startDateString,
            endDate: endDateString,
            customerId: parseInt(userId ?? ""),
            tourId: parseInt(tourId ?? ""),
          },
          navigate,
        ),
      fallbackUrl: "/login",
      testValue: isLoggedIn(),
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${VietNamBanner})`,
        backgroundSize: "cover",
      }}
      className="h-full py-[2rem]"
    >
      <ScreenCard
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
            <Form.Item name="note" noStyle />
            <Form.Item name="startDate" noStyle />
            <Form.Item name="endDate" noStyle />
            <Form.Item name="numOfAdult" noStyle />
            <Form.Item name="numOfChild" noStyle />
            <Form.Item name="totalPrice" noStyle />
            <div>
              <div className="mt-4 flex justify-end">
                {currentStep > 0 && (
                  <PrimaryButton
                    text="Previous"
                    className="mr-[1%]"
                    onClick={() => prev()}
                    disabled={stateBookingTour.isSending}
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
                    loading={stateBookingTour.isSending}
                  />
                )}
              </div>
            </div>
          </Form>
        </Form.Provider>
      </ScreenCard>
    </div>
  );
};

export default TourBookingPage;
