import { Descriptions } from "antd";
import { Image } from "../../components/image";
import QRMOMO from "../../../assets/QRMomo.jpg";

const FundDetailModal = ({ values }: { values: any }) => {
  return (
    <>
      <Image src={QRMOMO} />
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name">{values.name}</Descriptions.Item>
        <Descriptions.Item label="Phone">{values.phone}</Descriptions.Item>
        <Descriptions.Item label="Wallet Number">
          {values.walletNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {values.description}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default FundDetailModal;
