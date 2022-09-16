import React from "react";
import Moment from "moment";

function User(props) {
  const { id, name, email, phone, dob, address } = props.object;
  const formatDate = Moment(dob).format("D MMM YYYY");

  return (
    <div key={id} className="col-sm-6 col-md-4 v my-2">
      <div className="card shadow-sm w-100" style={{ minHeight: 160 }}>
        <div className="card-body">
          <h4 className="card-title text-center">{name}</h4>
          <h6 className="card-subtitle mb-2 text-muted text-center">{id}</h6>
          <h6 className="card-subtitle mb-2 text-muted text-center">{email}</h6>
          <h6 className="card-subtitle mb-2 text-muted text-center">{phone}</h6>
          <h6 className="card-subtitle mb-2 text-muted text-center">
            {formatDate}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted text-center">
            {address}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default User;
