import { InputNumber, Typography } from "antd";
import { Form } from "../../components/form";
import { Input } from "../../components/inputs";

const AddFundModal = ({
  form,
  initialValues,
}: {
  form: any;
  initialValues: any;
}) => {
  const { Paragraph } = Typography;

  const onFinish = () => {};

  const onFinishFailed = () => {};

  return (
    <>
      <div className="mb-[1rem] rounded-lg px-[2rem] py-[1.25rem] text-center">
        <Paragraph>
          - Minimum fund must be above 50{" "}
          <span className="text-[1.2rem] font-bold">(50.000VND)</span>.
        </Paragraph>
        <Paragraph>
          - Check your <span className="text-[1.2rem] font-bold">fund</span>{" "}
          carefully before{" "}
          <span className="text-[1.2rem] font-bold">Pressing OK</span>.
        </Paragraph>
        <Paragraph>
          - Check your{" "}
          <span className="text-[1.2rem] font-bold">Transaction Code</span>{" "}
          carefully.
        </Paragraph>
      </div>
      <div className="mx-auto w-[50%]">
        <Form
          form={form}
          initialValues={initialValues}
          name="AddFundForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="amount"
            label="Amount"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              placeholder="Type your fund here"
              min={50000}
              defaultValue={initialValues.amount}
              className="w-full"
              suffix="VND"
            />
          </Form.Item>
          <Form.Item
            name="transactionalCode"
            label="Transactional Code"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder="Type your transactional code"
              defaultValue={initialValues.transactionalCode}
              className="w-full"
            />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddFundModal;
