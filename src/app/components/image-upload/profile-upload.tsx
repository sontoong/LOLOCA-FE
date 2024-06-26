import { useEffect, useState } from "react";
import { UploadFile, UploadProps } from "antd";
import { UploadFileStatus } from "antd/es/upload/interface";
import { UploadImg } from "../inputs/upload-img";

interface uploadedImage {
  uid: string;
  name: string;
  status: UploadFileStatus | undefined;
  url: string;
}

export type Image = {
  name: string;
  url?: string;
  file?: File
}

export default function CustomUploadProfile(props: {
  value?: Image[];
  setImages: React.Dispatch<
    React.SetStateAction<Image[]>
  >;
}) {
  const { value, setImages } = props;
  let uploadedList: uploadedImage[] = [];
  if (value) {
    uploadedList = value.map((img : any, index : any) => {
      return {
        uid: `${-index}`,
        name: img.name,
        status: "done",
        url: img.url ?? "error",
      };
    });
  }

  const [fileList, setFileList] = useState<UploadFile[]>(uploadedList);

  useEffect(() => {
    const reformatImageList = fileList.map((img) => {
      if (img.originFileObj) {
        return {
          name: img.name,
          file: img.originFileObj,
        };
      } else return { name: img.name, url: img.url };
    });
    setImages(reformatImageList);
  }, [fileList, setImages]);

  const handleChange: UploadProps["onChange"] = ({ file, fileList }) => {
    if (file.type != "image/jpeg" && file.type != "image/png") {
      setFileList([]);
      return;
    }
    setFileList(fileList);
  };

  return (
    <UploadImg
      listType="picture-card"
      maxCount={1}
      onChange={handleChange}
      fileList={fileList}
    />
  );
}