import { useState } from "react";
import { Steps } from "antd";
import BookingModal from "../../components/customer_ui/bookingInfoModal";
import GuideInfoModal from "../../components/customer_ui/guideInfoModal";
import InstructionModal from "../../components/customer_ui/instructionModal";
import { PrimaryButton } from "../../components/buttons";
import { Form } from "../../components/form";
import { Card } from "../../components/card";
import VietNamBanner from "../../../assets/banner.png";


const { Step } = Steps;

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const handleNext = () => {
    form
      .validateFields()
      .then(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const steps = [
    {
        title: "Step 1",
        content: <InstructionModal />,
      },
    {
      title: "Step 2",
      content: <BookingModal form={form} />,
    },
    {
      title: "Step 3",
      content: <GuideInfoModal />,
    },

  ];

  return (
    <div
      style={{ backgroundImage: `url(${VietNamBanner})`, backgroundSize: 'cover' }}
      className="h-full py-[2rem]"
    >
        <Card cardTitle="Create your tour" className="w-[50%] mx-auto">
          <Steps current={currentStep} className="my-[5%]">
            {steps.map((step, index) => (
              <Step key={index} title={step.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[currentStep].content}</div>
          <div className="steps-action">
            <div className="flex justify-end mt-4">
              {currentStep > 0 && (
                <PrimaryButton text="Previous" className="mr-[1%]" onClick={handlePrev} />
              )}
              {currentStep < steps.length - 1 && (
                <PrimaryButton text="Next" onClick={handleNext} />
              )}
              {currentStep === steps.length - 1 && (
                <PrimaryButton text="Submit" onClick={form.submit} />
              )}
            </div>
          </div>
        </Card>
    </div>
  );
};

export default BookingPage;
