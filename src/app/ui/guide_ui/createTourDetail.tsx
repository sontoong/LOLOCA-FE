import { Form, Row, Col, Typography } from "antd";
import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Input } from "../../components/inputs";
import { Divider } from "../../components/divider";

const CreateTourDetail = ({ form, initialValues }: { form: any, initialValues: any }) => {
  const { Title } = Typography;

  const onFinish = (values: any) => {
    console.log("Form Values: ", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      name="CreateTourDetailForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="note"
        label="Description"
        rules={[
          {
            type: "string",
            required: true,
            whitespace: true,
          },
        ]}
      >
        <Input.TextArea placeholder="Describe your tour" />
      </Form.Item>

      <Title level={3} style={{ color: "#004AAD" }}>
        Highlight
      </Title>
      <Form.List name="HighlightDetails">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Row key={key} gutter={[8, 8]} align="top">
                <Col flex="auto">
                  <Form.Item
                    {...restField}
                    name={[name]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter a highlight",
                      },
                    ]}
                  >
                    <Input.TextArea placeholder="Enter a highlight" />
                  </Form.Item>
                </Col>
                {fields.length > 1 && fields.length !== index + 1 && (
                  <Col>
                    <MinusCircleFilled
                      onClick={() => remove(name)}
                      style={{ color: "red", fontSize: "2.5rem" }}
                    />
                  </Col>
                )}

                {fields.length === index + 1 && (
                  <Col>
                    <PlusCircleFilled
                      onClick={() => add()}
                      style={{ color: "#004AAD", fontSize: "2.5rem" }}
                    />
                  </Col>
                )}
              </Row>
            ))}
          </>
        )}
      </Form.List>
      <Divider colorSplit="black" />
      <Title level={3} style={{ color: "#004AAD" }}>
        Include
      </Title>
      <Form.List name="IncludeDetails">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Row key={key} gutter={[8, 8]} align="top">
                <Col flex="auto">
                  <Form.Item
                    {...restField}
                    name={[name]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter an inclusion",
                      },
                    ]}
                  >
                    <Input placeholder="What does your tour include?" />
                  </Form.Item>
                </Col>
                {fields.length > 1 && fields.length !== index + 1 && (
                  <Col>
                    <MinusCircleFilled
                      onClick={() => remove(name)}
                      size={50}
                      style={{ color: "red", fontSize: "2.5rem" }}
                    />
                  </Col>
                )}
                {fields.length === index + 1 && (
                  <Col>
                    <PlusCircleFilled
                      onClick={() => add()}
                      style={{ color: "#004AAD", fontSize: "2.5rem" }}
                    />
                  </Col>
                )}
              </Row>
            ))}
          </>
        )}
      </Form.List>
      <Divider colorSplit="black" />
      <Title level={3} style={{ color: "#004AAD" }}>
        Exclude
      </Title>
      <Form.List name="ExcludeDetails">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Row key={key} gutter={[8, 8]} align="top">
                <Col flex="auto">
                  <Form.Item
                    {...restField}
                    name={[name]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter an exclusion",
                      },
                    ]}
                  >
                    <Input placeholder="What does your tour exclude?" />
                  </Form.Item>
                </Col>
                {fields.length > 1 && fields.length !== index + 1 && (
                  <Col>
                    <MinusCircleFilled
                      onClick={() => remove(name)}
                      size={50}
                      style={{ color: "red", fontSize: "2.5rem" }}
                    />
                  </Col>
                )}
                {fields.length === index + 1 && (
                  <Col>
                    <PlusCircleFilled
                      onClick={() => add()}
                      style={{ color: "#004AAD", fontSize: "2.5rem" }}
                    />
                  </Col>
                )}
              </Row>
            ))}
          </>
        )}
      </Form.List>
    </Form>
  );
};


export default CreateTourDetail;
