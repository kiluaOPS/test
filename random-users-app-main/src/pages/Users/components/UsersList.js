import { useContext } from "react";
import { Input, List } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import UserCard from "../../../components/Users/UserCard";
import UsersContext from "../../../providers/UsersContextProvider";

function UsersList(props) {
  const usersContext = useContext(UsersContext);
  return (
    <>
      <Input
        placeholder="Search user by name "
        onChange={usersContext.onFilter}
        defaultValue=""
        addonBefore={<SearchOutlined />}
        size="medium"
        style={{ padding: "10px 25px" }}
      />
      <List
        className="user-list"
        itemLayout="horizontal"
        loading={usersContext.isLoading}
        dataSource={usersContext.filteredUsers()}
        pagination={{
          position: "top",
          current: usersContext.pagination.page,
          pageSizeOptions: [15, 50, 100],
          onChange: (page, results) => {
            usersContext.onPaginationChange({ page, results });
          },
          defaultPageSize: usersContext.pagination.results,
          pageSize: usersContext.pagination.results,
          total: 75,
        }}
        renderItem={(user) => (
          <UserCard
            key={user.login.uuid}
            uuid={user.login.uuid}
            picture={user.picture}
            name={user.name}
            email={user.email}
            nationality={user.nat}
            gender={user.gender}
            location={user.location}
            onDelete={usersContext.onDelete}
          />
        )}
      />
    </>
  );
}

export default UsersList;
