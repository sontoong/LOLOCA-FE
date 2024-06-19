import { Col, InputNumber, Row } from 'antd';

import { Input, InputDate, InputSelectTag, InputTime } from '../../components/inputs';
import { useParams } from 'react-router-dom';
import { Form } from '../../components/form';
import { useState } from 'react';

const TourGuideBookingInfo = ({ form } : { form : any}) => {
  const { tourGuideId } = useParams();
  const userId = localStorage.getItem("userId") ?? "";
  const [totalPrice, setTotalPrice] = useState<number | undefined>(0)

  const initialValues = {
    tourName: "",
    note: "",
    startDate: "",
    endDate: "",
    arrivalTime: "",
    departureTime: "",
    numOfAdult: 0,
    numOfChild: 0,
    tourType: [],
  };

  const onFinish = (values : any) => {
    const submitValues = { ...values, tourGuideId: tourGuideId, customerId: userId, price: totalPrice};
    console.log("Form Values: ", submitValues);    
  };

  const onFinishFailed = (errorInfo : any) => {
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
            rules={[{ required: true, message: "Please select start date" }]}
          >
            <InputDate placeholder="Enter start date" />
          </Form.Item>
          {/* <Form.Item
            name="arrivalTime"
            label="Arrival"
            rules={[{ required: true, message: "Please enter arrival time" }]}
          >
            <InputTime placeholder="Enter arrival time" />
          </Form.Item> */}
          <Form.Item
            name="numOfAdult"
            label="Adults"
            rules={[{ required: true, message: "Please enter number of adults" }]}
          >
            <InputNumber placeholder="How many adults will there be?" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="endDate"
            label="End"
            rules={[{ required: true, message: "Please select end date" }]}
          >
            <InputDate placeholder="Enter end date" />
          </Form.Item>
          {/* <Form.Item
            name="departureTime"
            label="Departure"
            rules={[{ required: true, message: "Please enter departure time" }]}
          >
            <InputTime placeholder="Enter departure time" />
          </Form.Item> */}
          <Form.Item
            name="numOfChild"
            label="Child/Children (2-12y)"
            rules={[{ required: true, message: "Please enter number of children" }]}
          >
            <InputNumber placeholder="How many children will there be?" />
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
        name="tourType"
        label="Type of holiday I am looking for"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputSelectTag
          placeholder="Choose types of holiday"
          options={tourTypes}
        />
      </Form.Item>
    </Form>
  );
};

export default TourGuideBookingInfo;
