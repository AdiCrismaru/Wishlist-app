import React, { useEffect, useState } from "react";
import { getSharedGroups } from "../../api/GroupsAxios";
import Nav from "../../components/Nav";
import SharedGroups from "./SharedGroups";
import WrapTextContainer from "../../components/WrapTextContainer";

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
      <WrapTextContainer>
        <SharedGroups data={sharedGroupData} />
      </WrapTextContainer>
    </>
  );
}

export default SharedGroupsUI;
