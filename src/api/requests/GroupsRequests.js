import React, { useEffect, useState } from "react";
import axios from "../axios";

export default function GroupsRequests() {
  const token = localStorage.getItem("token");

  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const getGroups = async () => {
    const response = await axios.get("/groups", {
      headers: { authorization: `Bearer ${token}` },
    });
    setGroups(response.data.groups);
    console.log(groups);
  };
  useEffect(() => {
    getGroups().catch((err) => {
      console.log(err);
    });
  }, []);

  const PostGroups = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "/wishlists",
        {
          name,
          details,
        },

        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        getGroups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <div>GroupsRequests</div>;
}
