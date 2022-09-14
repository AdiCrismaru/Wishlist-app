import React from "react";
import Moment from "moment";

function User(props) {
  const { id, name, email, phone, dob, address } = props.object;
  const formatDate = Moment(dob).format("D MMM YYYY");
  return (
    <div className="wrapper">
      <div key={id} className="user">
        <p> Name: {name}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p>Date of birth: {formatDate}</p>
        <p>Address: {address}</p>
      </div>
    </div>
  );
}

export default User;
