import React, { useEffect, useState } from "react";
import { getSharedGroups } from "../../api/GroupsAxios";
import Nav from "../../components/Nav";
import SharedGroups from "./SharedGroups";

function SharedGroupsUI() {
  const [sharedGroupData, setSharedGroupData] = useState([]);

  const setSharedGroups = () => {
    getSharedGroups()
      .then((res) => {
        setSharedGroupData(res.data.groups.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setSharedGroups();
  }, []);
  return (
    <>
      <Nav />
      <SharedGroups data={sharedGroupData} />
    </>
  );
}

export default SharedGroupsUI;
