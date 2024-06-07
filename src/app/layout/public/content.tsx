import { Content } from "antd/es/layout/layout";
import React from "react";
// import { useAppSelector } from "../../redux/hook";

export default function MyContent({ children }: { children: React.ReactNode }) {
  //   const { headerTitle } = useAppSelector((state) => state.header);
  //   const currentHeader = headerTitle[headerTitle.length - 1];
  return (
    <Content className="mx-5 pb-20 pt-16">
      {/* {currentHeader.title && (
        <div className="pb-5 text-xl uppercase">{currentHeader.title}</div>
      )} */}
      <main className="flex h-full justify-center bg-white">{children}</main>
    </Content>
  );
}
