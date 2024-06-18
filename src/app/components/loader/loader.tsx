import { Spin } from "antd";

function Loader() {
  return <div className="flex justify-center">Loading</div>;
}

function LoaderFullScreen({ spinning, percent }: LoaderProps) {
  return <Spin spinning={spinning} percent={percent} fullscreen />;
}

export { Loader, LoaderFullScreen };

type LoaderProps = {
  spinning: boolean;
  percent?: number;
};
