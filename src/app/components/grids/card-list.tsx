import { Col, Row } from "antd";

function CardListGrid<RecordType>({
  items,
  render,
}: CardListGridProps<RecordType>) {
  if (typeof items === "number") {
    return (
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32, xl: 40, xxl: 48 }, 28]}>
        {Array.from({ length: items }).map((_, index) => (
          <Col xs={24} sm={16} md={12} lg={8} xl={6} key={index}>
            {render()}
          </Col>
        ))}
      </Row>
    );
  }

  if (Array.isArray(items)) {
    return (
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32, xl: 40, xxl: 48 }, 28]}>
        {items.map((item, index) => (
          <Col xs={24} sm={16} md={12} lg={8} xl={6} key={index}>
            {render(item)}
          </Col>
        ))}
      </Row>
    );
  }
}

export default CardListGrid;

type CardListGridProps<RecordType> = {
  items: RecordType[] | number;
  render: (item?: RecordType) => React.ReactNode;
};
