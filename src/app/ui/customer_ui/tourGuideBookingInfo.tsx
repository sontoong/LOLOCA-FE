import { Col, Row, Typography } from "antd";
import {
  Input,
  InputDate,
  InputNumber,
  InputSelect,
} from "../../components/inputs";
import { Form } from "../../components/form";
import { useState } from "react";
import dayjs from "dayjs";
import { TourGuide } from "../../models/tourGuide";
import { formatCurrency } from "../../utils/utils";

const { Title } = Typography;

const TourGuideBookingInfo = ({
  form,
  tourGuide,
}: {
  form: any;
  tourGuide: TourGuide;
}) => {
  const [totalPrice, setTotalPrice] = useState<number | undefined>(0);

  const numOfAdult = Form.useWatch("numOfAdult", form);
  const numOfChild = Form.useWatch("numOfChild", form);
  const startDate: dayjs.Dayjs = Form.useWatch("startDate", form);
  const endDate: dayjs.Dayjs = Form.useWatch("endDate", form);

  const initialValues = {
    tourName: "",
    note: "",
    startDate: "",
    endDate: "",
    numOfAdult: 0,
    numOfChild: 0,
    tourTypeDTOs: [],
  };

  const onFinish = (values: any) => {
    const submitValues = {
      ...values,
      price: totalPrice,
      tourTypeDTOs: values.tourTypeDTOs.map((typeDetail: string) => ({
        typeDetail,
      })),
    };
    setTotalPrice(1);
    console.log("Form Values: ", submitValues);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const tourTypes = [
    { value: "Funny", label: "Funny" },
    { value: "Adventure", label: "Adventure" },
    { value: "Luxury", label: "Luxury" },
    { value: "Family", label: "Family" },
    { value: "Wildlife", label: "Wildlife" },
    { value: "Real Life", label: "Real Life" },
    { value: "Cultural", label: "Cultural" },
    { value: "Budget", label: "Budget" },
    { value: "Romantic", label: "Romantic" },
    { value: "Beach", label: "Beach" },
    { value: "Survival", label: "Survival" },
    { value: "Gourmet", label: "Gourmet" },
    { value: "Eco-Friendly", label: "Eco-Friendly" },
    { value: "Historical", label: "Historical" },
    { value: "Mountain", label: "Mountain" },
    { value: "Urban Exploration", label: "Urban Exploration" },
    { value: "Rural Retreat", label: "Rural Retreat" },
    { value: "Spiritual", label: "Spiritual" },
    { value: "Festival", label: "Festival" },
    { value: "Wellness", label: "Wellness" },
  ];

  const validateStartDate = (_: any, value: any) => {
    const endDate = form.getFieldValue("endDate");
    if (!value || !endDate || new Date(value) < new Date(endDate)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Start date must be before end date"));
  };

  const validateEndDate = (_: any, value: any) => {
    const startDate = form.getFieldValue("startDate");
    if (!value || !startDate || new Date(value) > new Date(startDate)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("End date must be after start date"));
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      name="BookingForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="tourName"
        label="Tour Request"
        rules={[
          {
            type: "string",
            required: true,
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Type your tour request here" />
      </Form.Item>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="startDate"
            label="Start"
            rules={[{ required: true }, { validator: validateStartDate }]}
          >
            <InputDate
              placeholder="Enter start date"
              minDate={dayjs().add(2, "days")}
              maxDate={endDate ? endDate.subtract(1, "days") : undefined}
            />
          </Form.Item>
          <Form.Item
            name="numOfAdult"
            label="Adults"
            rules={[
              {
                type: "number",
                required: true,
                min: 1,
              },
            ]}
          >
            <InputNumber
              placeholder="How many adults will there be?"
              min={0}
              max={12}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="endDate"
            label="End"
            rules={[
              {
                required: true,
                message: "Please select end date",
              },
              { validator: validateEndDate },
            ]}
          >
            <InputDate
              placeholder="Enter end date"
              minDate={
                startDate ? startDate.add(1, "days") : dayjs().add(2, "days")
              }
            />
          </Form.Item>
          <Form.Item
            name="numOfChild"
            label="Child/Children (2-12y)"
            rules={[
              { required: true, message: "Please enter number of children" },
            ]}
          >
            <InputNumber
              placeholder="How many children will there be?"
              min={0}
              max={12}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="note"
        label="Your Requirement"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea placeholder="I want to..." />
      </Form.Item>
      <Form.Item
        name="tourTypeDTOs"
        label="Type of holiday I am looking for"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputSelect.Tag
          placeholder="Choose types of holiday"
          options={tourTypes}
        />
      </Form.Item>
      <Title level={4}>
        Tổng:{" "}
        {formatCurrency(
          calculateTotalPrice(tourGuide.pricePerDay, numOfAdult, numOfChild),
        )}
      </Title>
    </Form>
  );
};

export default TourGuideBookingInfo;

function calculateTotalPrice(
  pricePerDay: number,
  adults: number,
  children: number,
) {
  const totalAdultPrice = adults * pricePerDay;
  const totalChildPrice = children * pricePerDay * 0.7;

  return totalAdultPrice + totalChildPrice;
}
