import { useEffect, useState } from "react";
import { PrimaryButton } from "../../components/buttons";
import { Modal } from "../../components/modals";
import { InputNumber, Typography, UploadFile } from "antd";
import { ImageUpload } from "../../components/image-upload";
import { Form } from "../../components/form";
import { Input, InputDate, InputSelect } from "../../components/inputs";
import { TourGuide } from "../../models/tourGuide";
import { useTourGuide } from "../../hooks/useTourGuide";
import { base64ToBlob, ensureBase64Avatar } from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../hooks/useAuth";
import dayjs from "dayjs";
import { Divider } from "../../components/divider";

const ProfileEditModal = ({
  tourGuideData,
  tourGuideId,
}: {
  tourGuideData: TourGuide;
  tourGuideId: string;
}) => {
  // const {Paragraph} = Typography
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Title } = Typography;
  const [bannerImages, setBannerImages] = useState<UploadFile[]>([]);
  const [profileImages, setProfileImages] = useState<UploadFile[]>([]);
  const { state } = useTourGuide();
  const { handleGetUserInfo } = useAuth();
  const [form] = Form.useForm();
  const {
    handleUpdateTourGuideInfo,
    handleUpdateTourGuideAvatar,
    handleUpdateTourguideCover,
  } = useTourGuide();

  useEffect(() => {
    form.setFieldsValue({
      tourGuideId: tourGuideId,
      description: tourGuideData.description,
      gender: tourGuideData.gender,
      dateOfBirth: dayjs(tourGuideData.dateOfBirth),
      phoneNumber: tourGuideData.phoneNumber,
      address: tourGuideData.address,
      zaloLink: tourGuideData.zaloLink,
      facebookLink: tourGuideData.facebookLink,
      instagramLink: tourGuideData.instagramLink,
      pricePerDay: tourGuideData.pricePerDay * 1000,
      status: tourGuideData.status,
    });

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
  }, [tourGuideData, form, tourGuideId]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const initialValues = {
    tourGuideId: "",
    description: "",
    dateOfBirth: "",
    gender: null,
    phoneNumber: "",
    address: "",
    zaloLink: "",
    facebookLink: "",
    instagramLink: "",
    pricePerDay: 0,
    status: "",
  };

  const onFinish = async (values: any) => {
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

    await handleUpdateTourGuideInfo({
      ...values,
      tourGuideId: tourGuideId,
      status: tourGuideData.status,
      firstName: tourGuideData.firstName,
      lastName: tourGuideData.lastName,
      pricePerDay: values.pricePerDay / 1000,
    });

    setIsModalVisible(false);
    await handleGetUserInfo();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const genderOptions = [
    { label: "Male", value: 0 },
    { label: "Female", value: 1 },
    { label: "Other", value: 2 },
  ];

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
        confirmLoading={state.isSending}
      >
        <Title level={3} style={{ color: "#004AAD", fontWeight: "bolder" }}>
          Profile
        </Title>
        <ImageUpload setImages={setProfileImages} images={profileImages} />
        <Title level={3} style={{ color: "#004AAD", fontWeight: "bolder" }}>
          Banner
        </Title>
        <ImageUpload setImages={setBannerImages} images={bannerImages} />
        <div className="w-[100%]">
          <Form
            form={form}
            initialValues={initialValues}
            name="DescriptionForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Divider colorSplit="black" />
            <Title level={3} style={{ color: "#004AAD", fontWeight: "bolder" }}>
              General Info
            </Title>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter your description" },
              ]}
            >
              <Input.TextArea placeholder="Enter your description" />
            </Form.Item>
            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
              rules={[{ required: true }]}
            >
              <InputDate placeholder="Enter date of birth" />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" },
                { pattern: /^\d+$/, message: "Phone number must be numeric" },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select your gender" }]}
            >
              <InputSelect
                placeholder="Select your gender"
                options={genderOptions}
              />
            </Form.Item>
            <Divider colorSplit="black" />
            <Title level={3} style={{ color: "#004AAD", fontWeight: "bolder" }}>
              Social Links
            </Title>
            <Form.Item name="zaloLink" label="Zalo" rules={[]}>
              <Input placeholder="Enter your zalo" />
            </Form.Item>
            <Form.Item name="facebookLink" label="Facebook" rules={[]}>
              <Input placeholder="Enter your facebook" />
            </Form.Item>
            <Form.Item name="instagramLink" label="Instagram" rules={[]}>
              <Input placeholder="Enter your instagram" />
            </Form.Item>
            <Divider colorSplit="black" />
            <Title level={3} style={{ color: "#004AAD", fontWeight: "bolder" }}>
              Price per day
            </Title>
            {/* <div className="px-[2rem] py-[1.25rem] mb-[1rem] rounded-lg text-center">
              <Paragraph>- Minimum fund must be above 50 <span className="font-bold text-[1.2rem]">(50.000VND)</span>.</Paragraph>
              <Paragraph>- Check your <span className="font-bold text-[1.2rem]">fund</span> carefully before <span className="font-bold text-[1.2rem]">Pressing OK</span>.</Paragraph>
              <Paragraph>- Check your <span className="font-bold text-[1.2rem]">Transaction Code</span> carefully.</Paragraph>
            </div> */}
            <Form.Item
              name="pricePerDay"
              rules={[{ type: "number", required: true, min: 1000 }]}
              className="w-full"
            >
              <InputNumber
                placeholder="Price per day"
                step={1000}
                suffix={"VND"}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileEditModal;
