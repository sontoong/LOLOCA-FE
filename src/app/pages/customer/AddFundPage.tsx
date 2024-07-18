import { Card } from "../../components/card";
import VietNamBanner from "../../../assets/banner.png";
import { Steps } from "antd";
import { Form } from "../../components/form";
import { useState } from "react";
import AddFundModal from "../../ui/customer_ui/addFundModal";
import { PrimaryButton } from "../../components/buttons";
import FundDetailModal from "../../ui/customer_ui/fundDetailModal";
import { usePayment } from "../../hooks/usePayment";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

const AddFundPage = () => {
  const { state: stateUser } = useAuth();
  const { state: statePayment, handleCreateDeposit } = usePayment();
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [mainForm] = Form.useForm();
  const navigate = useNavigate();

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep + 1);
  };

  const back = () => {
    window.scrollTo(0, 0);
    setCurrentStep(1);
  };

  const initialValues = {
    amount: 50000,
    transactionalCode: "",
  };

  const fundDetail = {
    name: "Nguyen Van A",
    phone: "12345678901",
    walletNumber: "12345678901",
    description: "LO12345678901",
  };

  const steps = [
    {
      title: "Transfer Fund",
      content: <FundDetailModal values={fundDetail} />,
    },
    {
      title: "Add Fund",
      content: <AddFundModal form={form} initialValues={initialValues} />,
    },
  ];

  const handleSubmit = (values: any) => {
    handleCreateDeposit(
      {
        accountId: stateUser.currentUser.AccountId,
        amount: values.amount / 1000,
        transactionCode: values.transactionalCode,
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
              mainForm.submit();
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
            <Form.Item name="amount" hidden />
            <Form.Item name="transactionalCode" hidden />
            <div className="mt-4 flex justify-end gap-2">
              {currentStep < steps.length - 1 && currentStep != 1 && (
                <PrimaryButton text="Next" onClick={() => next()} />
              )}
              {currentStep === steps.length - 1 && (
                <>
                  <PrimaryButton text="Next" onClick={() => back()} />
                  <PrimaryButton
                    onClick={() => form.submit()}
                    text="Ok"
                    loading={statePayment.isSending}
                  />
                </>
              )}
            </div>
          </Form>
        </Form.Provider>
      </Card>
    </div>
  );
};

export default AddFundPage;
