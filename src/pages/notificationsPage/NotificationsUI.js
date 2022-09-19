import React, { useEffect, useState } from "react";
import { getNotifications } from "../../api/NotificationsAxios";
import WrapTextContainer from "../../components/WrapTextContainer";
import { PuffLoader } from "react-spinners";

function NotificationsUI() {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const setNotifications = (start) => {
    getNotifications(start)
      .then((res) => {
        setData(res.data.notifications);
        setLoading(false);
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
      <div className="d-flex justify-content-center">
        {loading ? (
          <PuffLoader />
        ) : (
          <WrapTextContainer>
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
          </WrapTextContainer>
        )}
      </div>
    </>
  );
}

export default NotificationsUI;
