import { Col, InputNumber, Row, Typography } from "antd";
import { InputDate, Input } from "../../components/inputs";
import { Form } from "../../components/form";
import { useEffect } from "react";
import dayjs from "dayjs";
import { Tour } from "../../models/tour";
import { FormInstance } from "antd/lib";
import { formatCurrency } from "../../utils/utils";
import { Skeleton } from "../../components/skeletons";

const { Title } = Typography;

const TourBookingInfoModal = ({
  form,
  tour,
  initialValues,
  loading,
}: TTourBookingInfoModalProps) => {
  const startDate: dayjs.Dayjs =
    Form.useWatch("startDate", form) ?? initialValues.startDate;
  const numOfAdult = Form.useWatch("numOfAdult", form);
  const numOfChild = Form.useWatch("numOfChild", form);

  useEffect(() => {
    if (startDate && tour.duration) {
      const calculatedEndDate = startDate.add(tour.duration, "days");
      form.setFieldsValue({ endDate: calculatedEndDate });
    }
  }, [startDate, tour.duration, form]);

  useEffect(() => {
    form.setFieldsValue({
      totalPrice: calculateTotalPrice(
        tour.tourPriceDTOs,
        numOfAdult,
        numOfChild,
      ),
    });
  }, [form, numOfAdult, numOfChild, tour.tourPriceDTOs]);

  const onFinish = (values: typeof initialValues) => {
    console.log("Form Values: ", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {!loading ? (
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
                ]}
              >
                <InputDate
                  placeholder="Enter start date"
                  minDate={dayjs().add(1, "days")}
                />
              </Form.Item>
              <Form.Item
                name="numOfAdult"
                label="Adults"
                rules={[{ type: "number", required: true, min: 1 }]}
              >
                <InputNumber
                  placeholder="How many adults will there be?"
                  // unit="adult"
                  // pluralUnit="adults"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="End"
                rules={[{ required: true, message: "Please select end date" }]}
              >
                <InputDate
                  placeholder=""
                  value={startDate.add(tour.duration, "days")}
                  disabled
                />
              </Form.Item>
              <Form.Item
                name="numOfChild"
                label="Child/Children (2-12y)"
                rules={[{ type: "number", required: true }]}
              >
                <InputNumber
                  placeholder="How many children will there be?"
                  // unit="child"
                  // pluralUnit="children"
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
                whitespace: true,
              },
            ]}
          >
            <Input.TextArea
              placeholder="I want to..."
              showCount
              maxLength={100}
            />
          </Form.Item>
          <Title level={4}>
            Tổng:{" "}
            {formatCurrency(
              calculateTotalPrice(tour.tourPriceDTOs, numOfAdult, numOfChild) *
                1000,
            )}
          </Title>
        </Form>
      ) : (
        <Skeleton />
      )}
    </>
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
  initialValues: any;
  loading: boolean;
};
