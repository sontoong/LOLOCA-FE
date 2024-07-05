import { useEffect, useState } from "react";
import { Steps } from "antd";

import { PrimaryButton } from "../../components/buttons";
import { Form } from "../../components/form";
import { Card } from "../../components/card";
import VietNamBanner from "../../../assets/banner.png";
import InstructionModal from "../../ui/customer_ui/instructionModal";
import TourBookingInfoModal from "../../ui/customer_ui/tourBookingInfoModal";
import GuideInfoModal from "../../ui/customer_ui/guideInfoModal";
import { useParams } from "react-router-dom";
import { useTour } from "../../hooks/useTour";
import { useProtectedAction } from "../../hooks/useProtectedAction";
import { isLoggedIn } from "../../redux/slice/authSlice";
import { useBookingTour } from "../../hooks/useBookingTour";
import { dateToLocalISOString } from "../../utils/utils";
import dayjs from "dayjs";

const { Step } = Steps;

const TourBookingPage = () => {
  const { tourId } = useParams();
  const { state: stateTour, handleGetTourById } = useTour();
  const { handleCreateBookingTour } = useBookingTour();
  const { executeOrRedirect } = useProtectedAction();
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [mainForm] = Form.useForm();

  useEffect(() => {
    if (tourId) {
      handleGetTourById({ tourId: tourId });
    }
  }, [tourId, handleGetTourById]);

  const guide = {
    id: "LO161022",
    name: "Mark Zucc",
    gender: "Male",
    languages: ["English", "Malay"],
    image: VietNamBanner,
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
        <TourBookingInfoModal form={form} tour={stateTour.currentTour} />
      ),
    },
    {
      title: "Step 3",
      content: <GuideInfoModal guide={guide} />,
    },
  ];

  const initialValues = {
    note: "",
    startDate: dayjs(),
    endDate: dayjs(),
    numOfAdult: 0,
    numOfChild: 0,
    totalPrice: 0,
  };

  const handleSubmit = (values: typeof initialValues) => {
    const startDateString = dateToLocalISOString(values.startDate);
    const endDateString = dateToLocalISOString(values.endDate);
    const userId = localStorage.getItem("userId");

    executeOrRedirect({
      action: () =>
        handleCreateBookingTour({
          ...values,
          startDate: startDateString,
          endDate: endDateString,
          customerId: parseInt(userId ?? ""),
          tourId: parseInt(tourId ?? ""),
        }),
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
            <Form.Item name="note" hidden />
            <Form.Item name="startDate" hidden />
            <Form.Item name="endDate" hidden />
            <Form.Item name="numOfAdult" hidden />
            <Form.Item name="numOfChild" hidden />
            <Form.Item name="totalPrice" hidden />
            <div>
              <div className="mt-4 flex justify-end">
                {currentStep > 0 && (
                  <PrimaryButton
                    text="Previous"
                    className="mr-[1%]"
                    onClick={() => prev()}
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

export default TourBookingPage;
