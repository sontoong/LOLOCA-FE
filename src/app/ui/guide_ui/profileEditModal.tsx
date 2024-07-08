import { useEffect, useState } from "react";
import { PrimaryButton } from "../../components/buttons";
import { Modal } from "../../components/modals";
import { Typography, UploadFile } from "antd";
import { ImageUpload } from "../../components/image-upload";
import { Form } from "../../components/form";
import { Input } from "../../components/inputs";
import { TourGuide } from "../../models/tourGuide";
import { useTourGuide } from "../../hooks/useTourGuide"; 
import { base64ToBlob, ensureBase64Avatar } from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../hooks/useAuth";

const ProfileEditModal = ({ tourGuideData, tourGuideId }: { tourGuideData: TourGuide, tourGuideId: string }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Title } = Typography;
  const [bannerImages, setBannerImages] = useState<UploadFile[]>([]);
  const [profileImages, setProfileImages] = useState<UploadFile[]>([]);
  const {state} = useTourGuide()
  const {handleGetUserInfo} = useAuth()
  const [form] = Form.useForm();
  const { handleUpdateTourGuideInfo, handleUpdateTourGuideAvatar, handleUpdateTourguideCover} = useTourGuide(); 

  useEffect(() => {
      if (tourGuideData.avatar) {
        setProfileImages([
          {
            name: "Avatar",
            uid: uuidv4(),
            url: ensureBase64Avatar(tourGuideData.avatar),
          },
        ]);
        setBannerImages([
          {
            name: "Cover",
            uid: uuidv4(),
            url: ensureBase64Avatar(tourGuideData.cover),
          },
        ]);
    }
  }, [tourGuideData, form]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    // Handle avatar upload
    await handleUpdateTourGuideAvatar({
      TourGuideId: parseInt(tourGuideId),
      files: profileImages.flatMap((image) => {
        if (image.originFileObj) {
          return [image.originFileObj];
        } else if (image.url) {
          const blob = base64ToBlob(image.url, image.name);
          return blob ? [blob] : [];
        } else {
          return [];
        }
      }),
    });

    // Handle cover upload
    await handleUpdateTourguideCover({
      TourGuideId: parseInt(tourGuideId),
      files: bannerImages.flatMap((image) => {
        if (image.originFileObj) {
          return [image.originFileObj];
        } else if (image.url) {
          const blob = base64ToBlob(image.url, image.name);
          return blob ? [blob] : [];
        } else {
          return [];
        }
      }),
    });

    // Submit the form
    form.submit();


  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const initialValues = {
    description: tourGuideData.description,
  };

  const onFinish = async (values: any) => {
    await handleUpdateTourGuideInfo({
        tourGuideId: tourGuideId, 
        description: values.description,
        firstName: tourGuideData.firstName,
        lastName: tourGuideData.lastName,
        dateOfBirth: tourGuideData.dateOfBirth,
        gender: tourGuideData.gender,
        phoneNumber: tourGuideData.phoneNumber ?? "",
        address: tourGuideData.address ?? "",
        zaloLink: tourGuideData.zaloLink,
        facebookLink: tourGuideData.facebookLink,
        instagramLink: tourGuideData.instagramLink,
        pricePerDay: tourGuideData.pricePerDay,
        status: tourGuideData.status,
    }); 
    
    await handleGetUserInfo()

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <PrimaryButton
        onClick={showModal}
        text="Edit Profile"
        className="ml-[1rem] mr-[1rem]"
        size="large"
      />
      <Modal
        title="Edit Profile"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={null}
        confirmLoading={state.isFetching}
      >
        <Title level={3} style={{ color: "#004AAD", fontWeight: "bolder" }}>
          Profile
        </Title>
        <ImageUpload setImages={setProfileImages} images={profileImages} />
        <Title level={3} style={{ color: "#004AAD", fontWeight: "bolder" }}>
          Banner
        </Title>
        <ImageUpload setImages={setBannerImages} images={bannerImages} />
        <Form
          form={form}
          initialValues={initialValues}
          name="DescriptionForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter your description" },
            ]}
          >
            <Input.TextArea placeholder="Enter your description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfileEditModal;
