import { Col, Row, Space, Tooltip, Typography } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

import { PrimaryButton } from "../components/buttons";
import { Input, InputNumber } from "../components/inputs";

const { Title } = Typography;

export default function TestPage() {
  const baseComponents = [
    <Input placeholder="Text" />,
    <Input.Password placeholder="Password" />,
    <InputNumber placeholder="Number" />,
    <PrimaryButton text="Primary button" />,
  ];
  const sampleComponents = [
    <Input
      placeholder="Enter your username"
      prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
      suffix={
        <Tooltip title="Extra information">
          <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
        </Tooltip>
      }
    />,
    <PrimaryButton.BoldText size="large" text="Create" />,
    <PrimaryButton
      text="Get started"
      className="rounded-full"
      bgColor="#000000"
    />,
  ];

  return (
    <Space direction="vertical" className="w-full" size={24}>
      <div>
        <Title>Base</Title>
        <Row gutter={[16, 16]}>
          {baseComponents.map((item, index) => (
            <Col span={12} key={index}>
              {item}
            </Col>
          ))}
        </Row>
      </div>
      <div>
        <Title>Examples</Title>
        <Row gutter={[16, 16]}>
          {sampleComponents.map((item, index) => (
            <Col span={12} key={index}>
              {item}
            </Col>
          ))}
        </Row>
      </div>
    </Space>
  );
}
