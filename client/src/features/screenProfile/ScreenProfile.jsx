import "./ScreenProfile.css";
import React from "react";
import { useState } from "react";

const defaultImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXstoDmXI3ZQs0akG-W8gsy108JHocWn4C-g6ILL5R7oS-22j7CQ2NSMS40zMxe3bOGjA&usqp=CAU";

const ScreenProfile = ({ name = "Unknown", familyName = "Unknown", email = "Unknown", img = defaultImg }) => {
  const [userInfo, setUserInfo] = useState({
    name: name,
    familyName: familyName,
    email: email,
    img: img,
  });

  const [edit, setEdit] = useState(true);

  const handleEdit = () => {
    setEdit(false);
  };

  const handleApply = () => {
    setEdit(true);
  };

  const handleDelete = () => {
    setUserInfo({
      name: "Unknown",
      familyName: "Unknown",
      email: "Unknown",
      img: defaultImg,
    });
  }

  const handleInputChange = (e) => {
    e.preventDefault()
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  };

  return (
    <div className="container">
      <div className="body-container">
        <div className="main-body">

          <div className="card-profile">
            <div className="card">
              <img
                className="profile-img"
                src={img}
                alt="Not Found"
                width="150"
                height="150"
              />
              <div className="info-profile">
                <h4 className="name-profile">{`${userInfo.name} ${userInfo.familyName}`}</h4>
              </div>
            </div>
          </div>

          <div className="data-profile">
            <div className="body-data-profile">

              <div className="data-container">
                <div className="title-div">
                  <h6 className="title">FirstName </h6>
                </div>
                {edit ? (
                  <div className="info-div">{userInfo.name}</div>
                ) : (
                  <input className="input" type="text" name="name" onChange={(e) => handleInputChange(e)}/>
                )}
              </div>

              <div className="data-container">
                <div className="title-div">
                  <h6 className="title">FamilyName </h6>
                </div>
                {edit ? (
                  <div className="info-div">{userInfo.familyName}</div>
                ) : (
                  <input className="input" type="text" name="familyName" onChange={(e) => handleInputChange(e)}/>
                )}
              </div>

              <div className="data-container">
                <div className="title-div">
                  <h6 className="title">Email </h6>
                </div>
                {edit ? (
                  <div className="info-div">{userInfo.email}</div>
                ) : (
                  <input className="input" type="email" name="email" onChange={(e) => handleInputChange(e)}/>
                )}
              </div>

              <div className="buttons-div">
                <button onClick={(e) => handleEdit(e)} className="button">
                  Edit
                </button>
                <button onClick={(e) => handleApply(e)} className="button">
                  Apply
                </button>
                <button onClick={(e) => handleDelete(e)} className="button">
                  Delete
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ScreenProfile;
