import { Skeleton } from "antd";

const TestPage = () => {
  return (
    <div className="mx-5">
      <h1>ABC</h1>
      <Skeleton.Avatar active={true} size={200} shape={"circle"} />
    </div>
  );
};

export default TestPage;
