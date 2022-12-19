import react, { useState, useEffect } from "react";

import { apiProvider } from "../api/provider";

const UsersContext = react.createContext({
  users: [],
  isLoading: false,
  pagination: {},
  onDelete: (uuid) => {},
  onFilter: (searchParameter) => {},
  onPaginationChange: (pagination) => {},
  filteredUsers: () => {},
  getUser: (uuid) => {},
});

export const UsersContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    results: 15,
  });

  async function _getUsers() {
    setIsLoading(true);
    try {
      var usersResponse = await apiProvider.get(
        `?seed=abc&results=${pagination.results}&page=${pagination.page}`
      );
      setUsers(usersResponse.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    _getUsers();
  }, [pagination]);

  const filteredUsers = () => {
    return users.filter((user) =>
      user.name.first.toLowerCase().startsWith(filter.toLowerCase())
    );
  };

  const getUser = (uuid) => {
    var user = users.filter((user) => user.login.uuid === uuid);
    return user;
  };

  const handleDelete = (uuid) => {
    setUsers((prevState) => {
      return prevState.filter((user) => user.login.uuid !== uuid);
    });
  };

  const handlePaginationChange = (pagination) => {
    setPagination(pagination);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <UsersContext.Provider
      value={{
        users: users,
        isLoading: isLoading,
        pagination: pagination,
        onDelete: handleDelete,
        onFilter: handleFilter,
        onPaginationChange: handlePaginationChange,
        filteredUsers: filteredUsers,
        getUser: getUser,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
