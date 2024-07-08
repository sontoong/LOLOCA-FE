import { useState } from "react";
import { Steps } from "antd";
import { PrimaryButton } from "../../components/buttons";
import { Form } from "../../components/form";
import { Card } from "../../components/card";
import VietNamBanner from "../../../assets/banner.png";
import CreateTourInfo from "../../ui/guide_ui/createTourInfo";
import CreateTourDetail from "../../ui/guide_ui/createTourDetail";
import CreateTourItinerary from "../../ui/guide_ui/createTourItinerary";
import CreateTourPrice from "../../ui/guide_ui/createTourPrice";
import { useTour } from "../../hooks/useTour";
import { CreateTourParams } from "../../redux/slice/tourSlice";

const { Step } = Steps;

const CreateTourPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [mainForm] = Form.useForm();
  const { handleUploadTour } = useTour();

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep - 1);
  };

  const initialValues : CreateTourParams = {
    Name: "",
    Category: "",
    Duration: 0,
    images: [],
    TypeDetails: [],
    Activity: "",
    Description: "",
    HighlightDetails: [],
    IncludeDetails: [],
    ExcludeDetails: [],
    ItineraryNames: [],
    ItineraryDescriptions: [],
    AdultPrices: [],
    ChildPrices: [],
    TotalTouristFrom: [],
    TotalTouristTo: [],
    CityId: 0,
    TourGuideId: 0,
  };

  const steps = [
    {
      title: "Step 1",
      content: <CreateTourInfo form={form} initialValues={initialValues}/>,
    },
    {
      title: "Step 2",
      content: <CreateTourDetail form={form} initialValues={initialValues} />,
    },
    {
      title: "Step 3",
      content: <CreateTourItinerary form={form} initialValues={initialValues} />,
    },
    {
      title: "Step 4",
      content: <CreateTourPrice form={form} initialValues={initialValues} />,
    },
  ];

  const handleSubmit = (values: CreateTourParams) => {
    handleUploadTour(values);
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
            if (name === "CreateTourInfoForm") {
              mainForm.setFieldsValue({ ...values });
              next();
            }
            if (name === "CreateTourDetailForm") {
              mainForm.setFieldsValue({ ...values });
              next();
            }
            if (name === "CreateTourItineraryForm") {
              mainForm.setFieldsValue({ ...values });
              next();
            }
            if (name === "CreateTourPriceForm") {
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
            <Form.Item name="name" hidden />
            <Form.Item name="category" hidden />
            <Form.Item name="duration" hidden />
            <Form.Item name="tourTypeDTOs" hidden />
            <Form.Item name="activity" hidden />
            <Form.Item name="note" hidden />
            <Form.Item name="tourHighlightDTOs" hidden />
            <Form.Item name="tourIncludeDTOs" hidden />
            <Form.Item name="tourExcludeDTOs" hidden />
            <Form.Item name="tourItineraryDTOs" hidden />
            <Form.Item name="tourPriceDTOs" hidden />
            <Form.Item name="image" hidden/>
            <div>
              <div className="mt-4 flex justify-end">
                {currentStep > 0 && (
                  <PrimaryButton
                    text="Previous"
                    className="mr-[1%]"
                    onClick={() => prev()}
                  />
                )}
                {currentStep < steps.length - 1 && (
                  <PrimaryButton text="Next" onClick={() => form.submit()} />
                )}
                {currentStep === steps.length - 1 && (
                  <PrimaryButton
                    text="Submit"
                    onClick={() => {
                      form.submit();
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


export default CreateTourPage;