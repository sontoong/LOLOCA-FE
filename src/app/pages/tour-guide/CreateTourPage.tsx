import { useState, useEffect } from "react";
import { Steps, UploadFile } from "antd";
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
  const [tourImages, setTourImages] = useState<UploadFile[]>([]);
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [itineraryCount, setItineraryCount] = useState<number>(1);
  const tourGuideId = Number(localStorage.getItem("userId") ?? "");
  

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep - 1);
  };

  const initialValues: CreateTourParams = {
    Name: "",
    Category: "",
    Duration: duration || 0,
    images: [],
    TypeDetails: [],
    Activity: "",
    Description: "",
    HighlightDetails: [""],
    IncludeDetails: [""],
    ExcludeDetails: [""],
    ItineraryNames: Array.from({ length: itineraryCount }, () => ""),
    ItineraryDescriptions: Array.from({ length: itineraryCount }, () => ""),
    AdultPrices: [0],
    ChildPrices: [0],
    TotalTouristFrom: [0],
    TotalTouristTo: [0],
    CityId: 0,
    TourGuideId: tourGuideId,
  };

  useEffect(() => {
    // Update itinerary names and descriptions in mainForm when itineraryCount changes
    mainForm.setFieldsValue({
      ItineraryNames: Array.from({ length: itineraryCount }, () => ""),
      ItineraryDescriptions: Array.from({ length: itineraryCount }, () => ""),
    });
  }, [itineraryCount, mainForm]);

  const steps = [
    {
      title: "Step 1",
      content: <CreateTourInfo form={form} initialValues={initialValues} setTourImages={setTourImages} tourImages={tourImages} setDuration={setDuration} duration={duration}/>,
    },
    {
      title: "Step 2",
      content: <CreateTourDetail form={form} initialValues={initialValues} />,
    },
    {
      title: "Step 3",
      content: <CreateTourItinerary form={form} initialValues={initialValues} setItineraryCount={setItineraryCount} />,
    },
    {
      title: "Step 4",
      content: <CreateTourPrice form={form} initialValues={initialValues} />,
    },
  ];

  const handleSubmit = (values: any) => {
    const { price, ...restValues } = values;
  
    const formattedValues: any = {
      ...restValues, 
      AdultPrices: price?.map((item: any) => item.AdultPrices), 
      ChildPrices: price?.map((item: any) => item.ChildPrices), 
      TotalTouristFrom: price?.map((item: any) => item.TotalTouristFrom), 
      TotalTouristTo: price?.map((item: any) => item.TotalTouristTo), 
    };
  
    console.log("Formatted Create Tour Values: ", formattedValues);
  
    handleUploadTour(formattedValues);
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
              mainForm.setFieldsValue({ ...values, images: tourImages });
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
            <Form.Item name="Name" hidden />
            <Form.Item name="Category" hidden />
            <Form.Item name="Duration" hidden />
            <Form.Item name="images" hidden />
            <Form.Item name="TypeDetails" hidden />
            <Form.Item name="Activity" hidden />
            <Form.Item name="Description" hidden />
            <Form.Item name="HighlightDetails" hidden />
            <Form.Item name="IncludeDetails" hidden />
            <Form.Item name="ExcludeDetails" hidden />
            <Form.Item name="ItineraryNames" hidden />
            <Form.Item name="ItineraryDescriptions" hidden />
            <Form.Item name="AdultPrices" hidden />
            <Form.Item name="ChildPrices" hidden />
            <Form.Item name="TotalTouristFrom" hidden />
            <Form.Item name="TotalTouristTo" hidden />
            <Form.Item name="CityId" hidden />
            <Form.Item name="TourGuideId" hidden />
            <Form.Item name="price" hidden/>
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
