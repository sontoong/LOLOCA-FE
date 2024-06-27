import { Form } from "antd";
import { Card } from "../components/card";
import { PrimaryButton } from "../components/buttons";
import CreateTourPrice from "../ui/guide_ui/createTourPrice";

const TestPage = () => {
  const [form] = Form.useForm();

  return (
    <div>
      <Card cardTitle="Cool" className="w-[50%] mx-auto">
        <CreateTourPrice form={form}/>
        <PrimaryButton text="Submit" onClick={() => form.submit()}/>
      </Card>
    </div>
  );
};

export default TestPage;