import { Typography } from "antd";
import { Form } from "../../components/form";
import { Input, InputNumber } from "../../components/inputs";
import { Divider } from "../../components/divider";

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
    <div className="px-[2rem] py-[1.25rem] mb-[1rem] rounded-lg text-center">
        <Paragraph>- Minimum fund must be above 50 <span className="font-bold text-[1.2rem]">(50.000VND)</span>.</Paragraph>
        <Paragraph>- Check your fund carefully before moving to <span className="font-bold text-[1.2rem]">Step 2</span>.</Paragraph>
        <Paragraph>- Check your <span className="font-bold text-[1.2rem]">Transaction Code</span> carefully.</Paragraph>

        <Divider colorSplit="black"/>
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
            unit="VND"
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
