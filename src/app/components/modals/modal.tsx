import { Modal, ModalProps } from "antd";
import { useAppDispatch } from "../../redux/hook";
import { resetOTPModal } from "../../redux/slice/authSlice";
import { Form } from "../form";
import { Input } from "../inputs";

function CustomModal() {
  return <div></div>;
}

function OTP(props: OTPProps) {
  const dispatch = useAppDispatch();
  const { children, extraValues, open, confirmLoading, handleOk } = props;
  const [form] = Form.useForm();

  const initialValues = {
    code: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    handleOk({ code: values.code, ...extraValues });
  };

  const handleCancel = () => {
    dispatch(resetOTPModal());
  };

  return (
    <Modal
      title="OTP"
      open={open}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      maskClosable={false}
      destroyOnClose={true}
    >
      {children}
      <Form
        form={form}
        initialValues={initialValues}
        name="OTPModal"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="code"
          rules={[
            {
              type: "string",
              required: true,
              whitespace: true,
            },
          ]}
        >
          <Input.OTP formatter={(str) => str.toUpperCase()} length={6} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

CustomModal.OTP = OTP;

export default CustomModal;

type OTPProps = ModalProps & {
  extraValues: object;
  open: boolean;
  handleOk: (params: any) => void;
  confirmLoading: boolean;
};
