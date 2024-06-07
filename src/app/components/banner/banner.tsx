import { Typography } from 'antd';

const Banner = ({ image, title, description }: {image : string, title: string, description: string}) => {
  const { Title, Text } = Typography;

  return (
    <div style={{
      backgroundImage: `url(${image})`,
      boxShadow: '600px -6px 22px -4px rgba(0,0,0,0.49) inset',
      WebkitBoxShadow: '60px -6px 22px -4px rgba(0,0,0,0.49) inset',
      MozBoxShadow: '60px -6px 22px -4px rgba(0,0,0,0.49) inset',
      backgroundAttachment: "fixed"
    }}
    className='bg-cover bg-center w-[98.9vw] h-[400px] p-[5%] pt-[3%]'
    >
      <Title style={{
        color: "white", 
        fontSize: "500%",
        fontWeight: "bold"
      }}>
        {title}
      </Title>
      <Text style={{
        color: "white",
        fontSize: "120%",
        display: "block",
        width: "40%"
      }}>
        {description}
      </Text>
    </div>
  );
}

export default Banner;
