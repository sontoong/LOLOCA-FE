import { Typography } from "antd";
import { Form } from "../../components/form";
import { InputNumber } from "../../components/inputs";
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
          name="fund"
          label="Fund"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            placeholder="Type your fund here"
            min={50000}
            defaultValue={initialValues.fund}
            className="w-full"
            unit="VND"
          />
        </Form.Item>
      </Form>
    </div>
    </>
  );
};

export default AddFundModal;
