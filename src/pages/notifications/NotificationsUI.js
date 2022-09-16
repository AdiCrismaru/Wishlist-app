import React, { useEffect, useState } from "react";
import { getNotifications } from "../../api/NotificationsAxios";
import Nav from "../../components/Nav";

function NotificationsUI() {
  const [data, setData] = useState([]);

  const setNotifications = () => {
    getNotifications()
      .then((res) => {
        setData(res.data.notifications);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setNotifications();
  }, []);
  return (
    <>
      <Nav />
      <div className="d-flex justify-content-center">
        {data.map((notification) => {
          return (
            <div
              key={notification.id}
              className="col-sm-6 col-md-4 v my-3 d-flex justify-content-center"
            >
              <div
                className="card shadow-sm w-100 "
                style={{ minHeight: 150, maxWidth: 300 }}
              >
                <div className="card-body">
                  <h4 className="card-title text-center ">
                    {notification.category}
                  </h4>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    {notification.details}
                  </h6>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default NotificationsUI;