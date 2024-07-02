import { Steps } from "antd";
import { useState } from "react";

import VietNamBanner from "../../../assets/banner.png";
import { PrimaryButton } from "../../components/buttons";
import { Card } from "../../components/card";
import { Form } from "../../components/form";
import GuideInfoModal from "../../ui/customer_ui/guideInfoModal";
import InstructionModal from "../../ui/customer_ui/instructionModal";
import TourGuideBookingInfo from "../../ui/customer_ui/tourGuideBookingInfo";

const { Step } = Steps;

const TourGuideBookingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [mainForm] = Form.useForm();

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
      title: "Tour Guide Information",
      content: <InstructionModal />,
    },
    {
      title: "Booking Information",
      content: <TourGuideBookingInfo form={form} />,
    },
    {
      title: "Payment Information",
      content: <GuideInfoModal guide={guide} />,
    },
  ];

  const handleSubmit = (values: any) => {
    console.log("Form Values: ", values);
  };

  const initialValues = {
    tourName: "",
    note: "",
    startDate: "",
    endDate: "",
    arrivalTime: "",
    departureTime: "",
    numOfAdult: 0,
    numOfChild: 0,
    tourType: [],
  };

  return (
    <div
      style={{
        backgroundImage: `url(${VietNamBanner})`,
        backgroundSize: "cover",
      }}
      className="h-full py-[2rem]"
    >
      <Card cardTitle="Create your tour" className="mx-auto w-[50%]">
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
            <Form.Item name="tourName" hidden />
            <Form.Item name="note" hidden />
            <Form.Item name="startDate" hidden />
            <Form.Item name="endDate" hidden />
            <Form.Item name="arrivalTime" hidden />
            <Form.Item name="departureTime" hidden />
            <Form.Item name="adults" hidden />
            <Form.Item name="children" hidden />
            <Form.Item name="tourType" hidden />

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

export default TourGuideBookingPage;
