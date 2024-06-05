import { Col, Row, Space, Tooltip, Typography } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

import { PrimaryButton } from "../components/buttons";
import { Input, InputNumber, InputPassword } from "../components/inputs";

const { Title } = Typography;

export default function TestPage() {
  const baseComponents = [
    <Input placeholder="Text" />,
    <InputPassword placeholder="Password" />,
    <InputNumber placeholder="Number" />,
    <PrimaryButton>Primary button</PrimaryButton>,
  ];
  const sampleComponents = [
    <ExampleInput />,
    <PrimaryButton>
      <span style={{ fontWeight: "bold", color: "white", fontSize: "16px" }}>
        Create
      </span>
    </PrimaryButton>,
    <PrimaryButton className="rounded-full" bgColor="#000000">
      Get started
    </PrimaryButton>,
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

function ExampleInput() {
  return (
    <Input
      placeholder="Enter your username"
      prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
      suffix={
        <Tooltip title="Extra information">
          <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
        </Tooltip>
      }
    />
  );
}
