import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { App, Modal, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { RequiredFields } from "../../utils/helpers";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export function UploadImg(
  props: RequiredFields<
    Omit<UploadProps, "beforeUpload" | "onPreview" | "accept">,
    "listType" | "maxCount"
  >,
) {
  const { message } = App.useApp();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return false;
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1),
    );
  };

  return (
    <>
      <Upload
        {...props}
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        accept="image/png, image/jpeg"
      >
        <button style={{ border: 0, background: "none" }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}