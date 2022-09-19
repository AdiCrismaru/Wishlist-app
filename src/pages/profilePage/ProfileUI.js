import { getProfileInfo, putProfileInfo } from "../../api/ProfileAxios";
import ModalWrapper from "../../components/ModalWrapper";
import UpdateProfileModal from "./UpdateProfileModal";
import React, { useEffect, useState } from "react";
import ProfileData from "./ProfileData";

function ProfileUI() {
  const [data, setData] = useState({});

  const [modal, setModal] = useState(false);

  useEffect(() => {
    getProfileInfo()
      .then((res) => {
        setData(res.data);
      })
      .catch((res) => console.log(res));
  }, []);

  const onSubmitHandler = (payload) => {
    putProfileInfo(payload)
      .then(() => {
        setData({
          ...data,
          name: payload.name,
          phone: payload.phone,
          dob: payload.dob,
        });
        toggleModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <ProfileData data={data} toggleModal={toggleModal} />

      {modal && (
        <ModalWrapper close={toggleModal}>
          <UpdateProfileModal user={data} onSubmitHandler={onSubmitHandler} />
        </ModalWrapper>
      )}
    </>
  );
}

export default ProfileUI;
