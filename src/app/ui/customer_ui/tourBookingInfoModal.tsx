import { Col, Row } from 'antd';
import { InputDate, Input, InputNumber } from '../../components/inputs';
import { useParams } from 'react-router-dom';
import { Form } from '../../components/form';
import { useState, useEffect } from 'react';
import { Dayjs } from 'dayjs';

const TourBookingInfoModal = ({ form } : { form : any }) => {
  const { tourId } = useParams();
  const userId = localStorage.getItem("userId") ?? "";
  const [totalPrice, setTotalPrice] = useState<number | undefined>(0);
  const [duration] = useState<number>(7); // Example duration of 7 days
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const initialValues = {
    note: "",
    startDate: null,
    endDate: null,
    numOfAdult: 0,
    numOfChild: 0,
  };

  useEffect(() => {
    if (startDate && duration) {
      const calculatedEndDate = startDate.add(duration, 'day');
      setEndDate(calculatedEndDate);
      form.setFieldsValue({ endDate: calculatedEndDate });
    }
  }, [startDate, duration, form]);

  const onFinish = (values: any) => {
    const submitValues = { ...values, tourId: tourId, customerId: userId, price: totalPrice };
    setTotalPrice(1);
    console.log("Form Values: ", submitValues);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const validateStartDate = (_: any, value: Dayjs) => {
    if (!value || !endDate || value.isBefore(endDate)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Start date must be before end date'));
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      name="BookingForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="startDate"
            label="Start"
            rules={[
              { required: true },
              { validator: validateStartDate }
            ]}
          >
            <InputDate 
              placeholder="Enter start date"
              onChange={(date) => setStartDate(date)}
            />
          </Form.Item>
          <Form.Item
            name="numOfAdult"
            label="Adults"
            rules={[{ required: true }]}
          >
            <InputNumber placeholder="How many adults will there be?" unit='adult' pluralUnit='adults'/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="endDate"
            label="End"
            rules={[
              { required: true }
            ]}
          >
            <InputDate 
              placeholder="Enter end date"
              value={endDate}
              disabled
            />
          </Form.Item>
          <Form.Item
            name="numOfChild"
            label="Child/Children (2-12y)"
            rules={[{ required: true }]}
          >
            <InputNumber placeholder="How many children will there be?" unit='child' pluralUnit='children'/>
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
    </Form>
  );
};

export default TourBookingInfoModal;
