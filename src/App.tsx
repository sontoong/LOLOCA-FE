import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes/route";
import { App, ConfigProvider } from "antd";
import { validateMessages } from "./app/utils/validate-messages";

function AppWrapper() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
        },
      }}
      form={{ validateMessages }}
    >
      <App>
        <RouterProvider router={router} />
      </App>
    </ConfigProvider>
  );
}

export default AppWrapper;
