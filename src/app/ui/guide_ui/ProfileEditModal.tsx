import { useState } from "react";
import { PrimaryButton } from "../../components/buttons";
import { Modal } from "../../components/modals";
import { Typography } from "antd";
import { ImageUpload } from "../../components/image-upload";
import { Image } from "../../components/image-upload/profile-upload";
import { Form } from "../../components/form";
import { Input } from "../../components/inputs";

const ProfileEditModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Title } = Typography;
  const [profileImages, setProfileImages] = useState<Image[]>([]);
  const [bannerImages, setBannerImages] = useState<Image[]>([]);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const initialValues = {
    description: "",
  };

  const onFinish = (values: any) => {
    console.log('Form Values:', values);
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <PrimaryButton
        onClick={showModal}
        text="Edit Profile"
        className="ml-[1rem] mr-[5rem]"
        size="large"
      />
      <Modal
        title="Edit Profile"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={null}
      >
        <Title level={3} style={{ color: "#004AAD", fontWeight: "bolder" }}>
          Profile
        </Title>
        <ImageUpload setImages={setProfileImages} value={profileImages} />
        <Title level={3} style={{ color: "#004AAD", fontWeight: "bolder" }}>
          Banner
        </Title>
        <ImageUpload setImages={setBannerImages} value={bannerImages} />
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
              { required: true, message: 'Please enter your description' },
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
