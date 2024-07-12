import { useEffect, useMemo, useState } from "react";
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
import { base64ToBlob } from "../../utils/utils";
import { useAuth } from "../../hooks/useAuth";
import { TourGuide } from "../../models/tourGuide";

const { Step } = Steps;

const CreateTourPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [mainForm] = Form.useForm();
  const { handleUploadTour } = useTour();
  const [tourImages, setTourImages] = useState<UploadFile[]>([]);
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const { state: stateUser } = useAuth();
  const TourGuideId = Number(localStorage.getItem("userId") ?? "");
 

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep - 1);
  };

  const initialValues: CreateTourParams = useMemo(() => {
    const { cityId } = stateUser.currentUser as TourGuide || {};
    return {
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
      ItineraryNames: [""],
      ItineraryDescriptions: [""],
      AdultPrices: [0],
      ChildPrices: [0],
      TotalTouristFrom: [0],
      TotalTouristTo: [0],
      CityId: cityId,
      TourGuideId: TourGuideId,
    };
  }, [duration, TourGuideId, stateUser.currentUser, ]);

  useEffect(() => {
    const itineraries = initialValues.ItineraryNames.map((name: any, index: any) => ({
      name,
      description: initialValues.ItineraryDescriptions[index],
    }));
    form.setFieldsValue({
      itineraries,
    });

    const prices = initialValues.AdultPrices.map((_, index: any) => ({
      TotalTouristFrom: initialValues.TotalTouristFrom[index],
      TotalTouristTo: initialValues.TotalTouristTo[index],
      AdultPrices: initialValues.AdultPrices[index],
      ChildPrices: initialValues.ChildPrices[index],
    }));
    form.setFieldsValue({
      price: prices,
    });

  }, [form, initialValues]);

  const steps = [
    {
      title: "Step 1",
      content: (
        <CreateTourInfo
          form={form}
          initialValues={initialValues}
          setTourImages={setTourImages}
          tourImages={tourImages}
          setDuration={setDuration}
          duration={duration}
        />
      ),
    },
    {
      title: "Step 2",
      content: <CreateTourDetail form={form} initialValues={initialValues} />,
    },
    {
      title: "Step 3",
      content: <CreateTourItinerary form={form} />,
    },
    {
      title: "Step 4",
      content: <CreateTourPrice form={form} />,
    },
  ];

  const handleSubmit = (values: any) => {
    const { price, itineraries, images, ...restValues } = values;

    const formattedValues: any = {
      ...restValues,
      ItineraryNames: itineraries?.map((item: any) => item.name),
      ItineraryDescriptions: itineraries?.map((item: any) => item.description),
      AdultPrices: price?.map((item: any) => item.AdultPrices),
      ChildPrices: price?.map((item: any) => item.ChildPrices),
      TotalTouristFrom: price?.map((item: any) => item.TotalTouristFrom),
      TotalTouristTo: price?.map((item: any) => item.TotalTouristTo),
      images: images.flatMap((image : any) => {
        if (image.originFileObj) {
          return [image.originFileObj];
        } else if (image.url) {
          const blob = base64ToBlob(image.url, image.name);
          return blob ? [blob] : [];
        } else {
          return [];
        }
      }),
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
          <Form initialValues={initialValues} name="mainForm" form={mainForm} onFinish={handleSubmit}>
            {/* Hidden fields to keep the main form state */}
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
            <Form.Item name="itineraries" hidden />
            <Form.Item name="AdultPrices" hidden />
            <Form.Item name="ChildPrices" hidden />
            <Form.Item name="TotalTouristFrom" hidden />
            <Form.Item name="TotalTouristTo" hidden />
            <Form.Item name="CityId" hidden />
            <Form.Item name="TourGuideId" hidden />
            <Form.Item name="price" hidden />
            <Form.Item name="itineraries" hidden />
            <div>
              <div className="mt-4 flex justify-end">
                {currentStep > 0 && (
                  <PrimaryButton text="Previous" className="mr-[1%]" onClick={() => prev()} />
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
