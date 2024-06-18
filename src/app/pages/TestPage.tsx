import { PrimaryButton } from "../components/buttons";
import { Card } from "../components/card";
import BookingModal from "../components/customer_ui/bookingInfoModal";
import { Form } from "antd";

export default function TestPage() {
  const [form] = Form.useForm();

  const onSubmitClick = () => {
    form.submit();
  };

  return (
    <>
      <Card cardTitle="Create your tour" className="w-[30%] my-[2rem] mx-auto">
        <BookingModal form={form} />
        <PrimaryButton text="Submit" onClick={onSubmitClick} />
      </Card>
    </>
  );
}
