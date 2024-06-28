import { Form, FormProps } from "antd";
import { RequiredFields } from "../../utils/helpers";

interface DefaultFormProps
  extends Omit<
    RequiredFields<FormProps, "initialValues" | "name">,
    "layout" | "scrollToFirstError"
  > {}

function DefaultForm(props: DefaultFormProps) {
  const { children } = props;
  return (
    <Form
      {...props}
      layout="vertical"
      scrollToFirstError={{
        behavior: "smooth",
        block: "center",
        inline: "center",
      }}
    >
      <>{children}</>
    </Form>
  );
}

DefaultForm.useWatch = Form.useWatch;
DefaultForm.Item = Form.Item;
DefaultForm.useForm = Form.useForm;
DefaultForm.Provider = Form.Provider;

export default DefaultForm;
