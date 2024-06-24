import { Space, Typography } from "antd";
import bannerRegister from "../../../assets/registerBanner.png";
import { Image } from "../../components/image";
import logoAuth from "../../../assets/logoAuth.png";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/buttons";

const { Title, Paragraph } = Typography;

export default function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center">
      <Space size={10}>
        <div className="m-[50px]">
          <Image width={600} src={bannerRegister} preview={false} />
        </div>
        <Space direction="vertical" size="large">
          <div className="flex justify-center">
            <Image
              width={300}
              src={logoAuth}
              preview={false}
              onClick={() => navigate("/")}
              className="cursor-pointer"
            />
          </div>
          <div className="flex w-[80%] items-center justify-between">
            <div>
              <Title
                style={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  marginBottom: "0",
                }}
              >
                Thank You
              </Title>
              <Paragraph style={{ width: "90%", fontSize: "1.3rem" }}>
                We appreciate you using our service. Your trust and support
                drive us to constantly improve. Looking forward to serving you
                again soon.
              </Paragraph>
            </div>
            <div className="text-[8rem] text-green-700">
              <CheckCircleOutlined />
            </div>
          </div>
          <div>
            <Title
              className="text-center"
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "2rem",
              }}
            >
              Where to go next?
            </Title>
            <div className="flex justify-evenly">
              <PrimaryButton text="Home page" onClick={() => navigate("/")} />
              <PrimaryButton
                text="Request List"
                onClick={() => navigate("/customer/request")}
              />
            </div>
          </div>
        </Space>
      </Space>
    </div>
  );
}
