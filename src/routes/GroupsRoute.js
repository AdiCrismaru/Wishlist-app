import React from "react";
import Nav from "../components/Nav";
import { GroupsProvider } from "../context/GroupsContext";
import GroupsUI from "../pages/groupsPage/GroupsUI";

export default function GroupsRoute() {
  return (
    <div>
      <Nav />
      <GroupsProvider>
        <GroupsUI />
      </GroupsProvider>
    </div>
  );
}
