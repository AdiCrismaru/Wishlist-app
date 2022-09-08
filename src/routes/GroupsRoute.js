import React from "react";
import GroupsRequests from "../api/requests/GroupsRequests";
import Nav from "../components/Nav";

export default function GroupsRoute() {
  return (
    <div>
      <Nav />
      <GroupsRequests />
    </div>
  );
}
