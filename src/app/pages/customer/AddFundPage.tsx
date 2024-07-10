import { Card } from "../../components/card";
import VietNamBanner from "../../../assets/banner.png";
import { Steps } from "antd";
import { Form } from "../../components/form";
import { useState } from "react";
import AddFundModal from "../../ui/customer_ui/addFundModal";
import { PrimaryButton } from "../../components/buttons";
import FundDetailModal from "../../ui/customer_ui/fundDetailModal";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

const AddFundPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [mainForm] = Form.useForm();
  const navigate = useNavigate()

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep + 1);
  };

  const initialValues = {
    fund: 50000,
  };

  const fundDetail={
    name: "Nguyen Van A",
    phone: "12345678901",
    walletNumber: "12345678901",
    description: "LO12345678901",
  }

  const steps = [
    {
      title: "Add Fund",
      content: <AddFundModal form={form} initialValues={initialValues} />,
    },
    {
      title: "Transfer Fund",
      content: <FundDetailModal values={fundDetail}/>,
    },
  ];

  const handleSubmit = () => {};

  return (
    <div
      style={{
        backgroundImage: `url(${VietNamBanner})`,
        backgroundSize: "cover",
      }}
      className="h-full py-[2rem]"
    >
      <Card cardTitle="Add Fund" className="mx-auto w-[50%]" bordered={false}>
        <Steps current={currentStep} className="my-[5%]">
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>
        <Form.Provider
          onFormFinish={(name, { values, forms }) => {
            const { mainForm } = forms;
            if (name === "AddFundForm") {
              mainForm.setFieldsValue({ ...values });
              mainForm.submit()
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
            <div className="mt-4 flex justify-end">
            {currentStep < steps.length - 1 && currentStep != 1 && (
              <PrimaryButton text="Next" onClick={() => form.submit()} />
            )}
            {currentStep === steps.length - 1 && (
              <PrimaryButton
                text="Ok"
                onClick={() => {
                    navigate('/')
                }}
              />
            )}
            </div>
          </Form>
        </Form.Provider>
      </Card>
    </div>
  );
};

export default AddFundPage;
