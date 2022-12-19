import { Routes, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "./App.scss";
import Home from "./pages/Home";
import Users from "./pages/Users/Users";
import NotFound from "./pages/NotFound";
import { UsersContextProvider } from "./providers/UsersContextProvider";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Link to={"home"}>
          <div className="logo" />
        </Link>
        <Menu selectable={false} theme="dark" mode="horizontal">
          <Menu.Item key="users-menu-key">
            <Link to="users">
              <UserOutlined /> Users
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Layout className="site-layout-background" >
          <Content
            style={{
              padding: 0,
              margin: 0,
              background: "#fff",
            }}
          >
            <UsersContextProvider>
              <Routes>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="users/*" element={<Users />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </UsersContextProvider>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
