import { ConfigProvider, Table, TableProps } from "antd";

function CustomTable({
    ...rest
  }: TableProps) {
  
    return (
      <ConfigProvider
        theme={{
            components:{
                Table:{
                  headerBg: "#004AAD",
                  headerColor: "white",
                  headerSplitColor: "#004AAD",
                }
            }
        }}
      >
        <Table {...rest} />
      </ConfigProvider>
    );
  }

  export default CustomTable;
