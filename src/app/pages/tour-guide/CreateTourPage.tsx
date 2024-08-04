import { Steps, UploadFile } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import VietNamBanner from "../../../assets/banner.png";
import { PrimaryButton } from "../../components/buttons";
import { Form } from "../../components/form";
import { Skeleton } from "../../components/skeletons";
import { useAuth } from "../../hooks/useAuth";
import { useTour } from "../../hooks/useTour";
import { Tour } from "../../models/tour";
import { TourGuide } from "../../models/tourGuide";
import { CreateTourParams } from "../../redux/slice/tourSlice";
import CreateTourDetail from "../../ui/guide_ui/createTourDetail";
import CreateTourInfo from "../../ui/guide_ui/createTourInfo";
import CreateTourItinerary from "../../ui/guide_ui/createTourItinerary";
import CreateTourPrice from "../../ui/guide_ui/createTourPrice";
import { base64ToBlob, ensureBase64Avatar } from "../../utils/utils";
import { ScreenCard } from "../../components/card";

const { Step } = Steps;

const CreateTourPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [mainForm] = Form.useForm();
  const {
    state: stateTour,
    handleUploadTour,
    handleGetTourById,
    handleUpdateTour,
  } = useTour();
  const [tourImages, setTourImages] = useState<UploadFile[]>([]);
  const { state: stateUser } = useAuth();
  const { tourId } = useParams();

  //fetch info
  useEffect(() => {
    if (tourId) {
      handleGetTourById({ tourId: tourId });
    }
  }, [handleGetTourById, tourId]);

  useEffect(() => {
    if (stateTour.currentTour.tourImgViewList)
      setTourImages(
        stateTour.currentTour.tourImgViewList?.map((img, index) => ({
          name: `Image ${index + 1}`,
          uid: uuidv4(),
          url: ensureBase64Avatar(img.imagePath),
        })),
      );
  }, [stateTour.currentTour.tourImgViewList]);

  const fetchedValues = {
    ...stateTour.currentTour,
    tourPriceDTOs: stateTour.currentTour.tourPriceDTOs?.map((price) => ({
      ...price,
      adultPrice: price.adultPrice * 1000,
      childPrice: price.childPrice * 1000,
    })),
    tourTypeDTOs: stateTour.currentTour.tourTypeDTOs?.map(
      (type) => type.typeDetail,
    ),
  };

  const initialValues = tourId
    ? fetchedValues
    : {
        name: "",
        category: "",
        duration: 0,
        tourImgViewList: undefined,
        tourTypeDTOs: undefined,
        activity: "",
        description: "",
        tourHighlightDTOs: [{ highlightDetail: "" }],
        tourIncludeDTOs: [{ includeDetail: "" }],
        tourExcludeDTOs: [{ excludeDetail: "" }],
        tourItineraryDTOs: [{ description: "", name: "" }],
        tourPriceDTOs: [
          {
            totalTouristTo: 0,
            totalTouristFrom: 0,
            adultPrice: 0,
            childPrice: 0,
          },
        ],
        tourId: 0,
        cityId: 0,
        tourGuideId: "",
        status: 0,
      };

  const steps = [
    {
      title: "Step 1",
      content: (
        <CreateTourInfo
          form={form}
          initialValues={initialValues}
          setTourImages={setTourImages}
          tourImages={tourImages}
        />
      ),
    },
    {
      title: "Step 2",
      content: <CreateTourDetail form={form} initialValues={initialValues} />,
    },
    {
      title: "Step 3",
      content: (
        <CreateTourItinerary form={form} initialValues={initialValues} />
      ),
    },
    {
      title: "Step 4",
      content: <CreateTourPrice form={form} initialValues={initialValues} />,
    },
  ];

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (values: Tour) => {
    const {
      tourPriceDTOs,
      tourItineraryDTOs,
      name,
      activity,
      category,
      description,
      duration,
      tourExcludeDTOs,
      tourTypeDTOs,
      tourHighlightDTOs,
      tourIncludeDTOs,
    } = values;
    const TourGuideId = localStorage.getItem("userId");
    const { cityId } = stateUser.currentUser as TourGuide;

    const formattedValues: CreateTourParams = {
      TourGuideId: TourGuideId ?? "",
      CityId: cityId ?? "",
      Name: name,
      Activity: activity ?? "",
      Category: category ?? "",
      Description: description,
      Duration: duration,
      ExcludeDetails: tourExcludeDTOs?.map((value) => value.excludeDetail),
      TypeDetails: tourTypeDTOs as [],
      HighlightDetails: tourHighlightDTOs?.map(
        (value) => value.highlightDetail,
      ),
      IncludeDetails: tourIncludeDTOs?.map((value) => value.includeDetail),
      ItineraryNames: tourItineraryDTOs?.map((item: any) => item.name),
      ItineraryDescriptions: tourItineraryDTOs?.map(
        (item: any) => item.description,
      ),
      AdultPrices: tourPriceDTOs?.map((item: any) => item.adultPrice / 1000),
      ChildPrices: tourPriceDTOs?.map((item: any) => item.childPrice / 1000),
      TotalTouristFrom: tourPriceDTOs?.map(
        (item: any) => item.totalTouristFrom,
      ),
      TotalTouristTo: tourPriceDTOs?.map((item: any) => item.totalTouristTo),
      images: tourImages?.flatMap((image: any) => {
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
    if (tourId) {
      handleUpdateTour({ ...formattedValues, TourId: tourId }, navigate);
    } else {
      handleUploadTour(formattedValues, navigate);
    }
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
        {stateTour.isFetching ? (
          <Skeleton paragraph={{ rows: 5 }} />
        ) : (
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
              <Form.Item name="name" noStyle />
              <Form.Item name="category" noStyle />
              <Form.Item name="duration" noStyle />
              <Form.Item name="tourImgViewList" noStyle />
              <Form.Item name="tourTypeDTOs" noStyle />
              <Form.Item name="activity" noStyle />
              <Form.Item name="description" noStyle />
              <Form.Item name="tourHighlightDTOs" noStyle />
              <Form.Item name="tourIncludeDTOs" noStyle />
              <Form.Item name="tourExcludeDTOs" noStyle />
              <Form.Item name="tourItineraryDTOs" noStyle />
              <Form.Item name="tourPriceDTOs" noStyle />

              <div>
                <div className="mt-4 flex justify-end">
                  {currentStep > 0 && (
                    <PrimaryButton
                      text="Previous"
                      className="mr-[1%]"
                      onClick={() => prev()}
                      disabled={stateTour.isSending}
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
                      loading={stateTour.isSending}
                    />
                  )}
                </div>
              </div>
            </Form>
          </Form.Provider>
        )}
      </ScreenCard>
    </div>
  );
};

export default CreateTourPage;
