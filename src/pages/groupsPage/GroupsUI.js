import React, { useEffect, useState } from "react";
import { getGroups, getSharedGroups } from "../../api/GroupsAxios";
import Nav from "../../components/Nav";
import Groups from "./Groups";
import ModalAddGroup from "./ModalAddGroup";
import SharedGroups from "./SharedGroups";

export default function GroupsUI() {
  const [data, setData] = useState([]);
  const [sharedGroupData, setSharedGroupData] = useState([]);

  const setGroups = () => {
    getGroups()
      .then((res) => {
        setData(res.data.groups);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setSharedGroups = () => {
    getSharedGroups()
      .then((res) => {
        setSharedGroupData(res.data.groups);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setGroups();
    setSharedGroups();
  }, []);

  return (
    <>
      <Nav />
      <ModalAddGroup setGroups={setGroups} />
      <Groups groupsArray={data} setGroups={setGroups} />
      <SharedGroups data={sharedGroupData} />
    </>
  );
}
