import { Typography } from 'antd';
import { UserOutlined, MailOutlined, CheckCircleOutlined, SmileOutlined, ArrowDownOutlined } from '@ant-design/icons';

const InstructionModal = () => {
  const { Title, Text } = Typography;

  const instruction = [
    { icon: <UserOutlined />, description: "Tell us your travel wishlist" },
    { icon: <MailOutlined />, description: "Receive customised tour proposals from local guides" },
    { icon: <CheckCircleOutlined />, description: "Choose from the guides who have responded to you" },
    { icon: <SmileOutlined />, description: "Have an unforgettable holiday!" },
  ];

  return (
    <div className="flex flex-col items-center">
      <Title style={{ fontWeight: "bold" }}>How it works?</Title>
      {instruction.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <Text className='text-[#004AAD] font-extrabold text-[2rem]'>{item.icon}</Text>
            <Text className='font-bold'>{item.description}</Text>
          </div>
          {index < instruction.length - 1 && <ArrowDownOutlined className="text-[44px] my-[16px] font-bold"  />}
        </div>
      ))}
    </div>
  );
}

export default InstructionModal;
