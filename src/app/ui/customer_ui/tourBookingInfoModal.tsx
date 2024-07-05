import { Col, Row, Typography } from "antd";
import { InputDate, Input, InputNumber } from "../../components/inputs";
import { Form } from "../../components/form";
import { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import { Tour } from "../../models/tour";
import { FormInstance } from "antd/lib";
import { formatCurrency } from "../../utils/utils";

const { Title } = Typography;

const TourBookingInfoModal = ({ form, tour }: TTourBookingInfoModalProps) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const numOfAdult = Form.useWatch("numOfAdult", form);
  const numOfChild = Form.useWatch("numOfChild", form);

  const initialValues = {
    note: "",
    startDate: null,
    endDate: null,
    numOfAdult: 0,
    numOfChild: 0,
    totalPrice: 0,
  };

  useEffect(() => {
    if (startDate && tour?.duration) {
      const calculatedEndDate = startDate.add(tour.duration, "day");
      setEndDate(calculatedEndDate);
      form.setFieldsValue({ endDate: calculatedEndDate });
    }
  }, [startDate, tour?.duration, form]);

  useEffect(() => {
    form.setFieldValue(
      "totalPrice",
      calculateTotalPrice(tour.tourPriceDTOs, numOfAdult, numOfChild),
    );
  }, [form, numOfAdult, numOfChild, tour.tourPriceDTOs]);

  const onFinish = (values: typeof initialValues) => {
    console.log("Form Values: ", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const validateStartDate = (_: any, value: Dayjs) => {
    if (!value || !endDate || value.isBefore(endDate)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Start date must be before end date"));
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      name="BookingForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name="totalPrice" hidden />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="startDate"
            label="Start"
            rules={[
              { required: true, message: "Please select start date" },
              { validator: validateStartDate },
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
            rules={[{ type: "number", required: true, min: 1 }]}
          >
            <InputNumber
              placeholder="How many adults will there be?"
              unit="adult"
              pluralUnit="adults"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="endDate"
            label="End"
            rules={[{ required: true, message: "Please select end date" }]}
          >
            <InputDate placeholder="" value={endDate} disabled />
          </Form.Item>
          <Form.Item
            name="numOfChild"
            label="Child/Children (2-12y)"
            rules={[{ type: "number", required: true }]}
          >
            <InputNumber
              placeholder="How many children will there be?"
              unit="child"
              pluralUnit="children"
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="note"
        label="Your Requirement"
        rules={[
          {
            type: "string",
            required: true,
            whitespace: true,
          },
        ]}
      >
        <Input.TextArea placeholder="I want to..." showCount maxLength={100} />
      </Form.Item>
      <Title level={4}>
        Tổng:{" "}
        {formatCurrency(
          calculateTotalPrice(tour.tourPriceDTOs, numOfAdult, numOfChild) *
            1000,
        )}
      </Title>
    </Form>
  );
};

export default TourBookingInfoModal;

function calculateTotalPrice(
  prices: Tour["tourPriceDTOs"],
  adults: number,
  children: number,
) {
  let adultPrice = 0;
  let childPrice = 0;

  for (const priceDTO of prices) {
    if (
      adults >= priceDTO.totalTouristFrom &&
      adults <= priceDTO.totalTouristTo
    ) {
      adultPrice = priceDTO.adultPrice;
    }
    if (
      children >= priceDTO.totalTouristFrom &&
      children <= priceDTO.totalTouristTo
    ) {
      childPrice = priceDTO.childPrice;
    }
  }

  //exceeds the highest price range
  if (adults > prices[prices.length - 1].totalTouristTo) {
    adultPrice = prices[prices.length - 1].adultPrice;
  }

  if (children > prices[prices.length - 1].totalTouristTo) {
    childPrice = prices[prices.length - 1].childPrice;
  }

  const totalAdultPrice = adults * adultPrice;
  const totalChildPrice = children * childPrice;

  return totalAdultPrice + totalChildPrice;
}

type TTourBookingInfoModalProps = {
  form: FormInstance;
  tour: Tour;
};
