import { useContext } from "react";
import { Route, Routes, useParams } from "react-router-dom";

import UserDetail from "../../components/Users/UserDetail";
import UsersList from "./components/UsersList";
import UsersContext from "../../providers/UsersContextProvider";

function Users(props) {
  const usersContext = useContext(UsersContext);
  const id = useParams();

  return (
    <Routes>
      <Route index element={<UsersList />} />
      <Route
        path={":id"}
        element={<UserDetail user={usersContext.getUser(id["*"])} />}
      />
    </Routes>
  );
}

export default Users;
