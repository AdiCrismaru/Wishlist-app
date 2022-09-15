import React, { useEffect, useState } from "react";
import { getGroups, getSharedGroups } from "../../api/GroupsAxios";
import Nav from "../../components/Nav";
import Groups from "./Groups";
import ModalAddGroup from "./ModalAddGroup";

export default function GroupsUI() {
  const [data, setData] = useState([]);

  const setGroups = () => {
    getGroups()
      .then((res) => {
        setData(res.data.groups.reverse());
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setGroups();
  }, []);

  return (
    <>
      <Nav />
      <ModalAddGroup setGroups={setGroups} />
      <Groups groupsArray={data} setGroups={setGroups} />
    </>
  );
}
