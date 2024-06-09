import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Result
      status="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" className="bg-blueAnt" onClick={handleGoBack}>
          Quay về
        </Button>
      }
    />
  );
};

export default ErrorPage;
