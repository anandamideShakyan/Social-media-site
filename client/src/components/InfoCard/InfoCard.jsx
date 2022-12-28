import React, { useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { logoutUser } from "../../actions/AuthAction";
import * as UserApi from '../../api/UserRequest'
const InfoCard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData)
  const params = useParams()
  const profileUserId = params.id;
  const [profileUser,setProfileUser] = useState({})
  
  const [modalOpened,setModalOpened] = useState(false);
  const handleLogout = () => {
    dispatch(logoutUser())
  }
  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        
        setProfileUser(user) 
      }
      else {
        console.log("loading");
        const profileUser = await UserApi.getUser(profileUserId)
        console.log("othersprofile")
        setProfileUser(profileUser)
      }
    }
    fetchProfileUser()
  },[user])
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        {user._id === profileUserId ? (
        <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            data={user}
          />
        </div>
      ) : (
            ""
             )}
    </div>
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives In </b>
        </span>
        <span>{profileUser.livesIn}</span>
      </div>

      <div className="info">
        <span>
          <b>Works At </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogout} >Log out</button>
    </div>
  );
};

export default InfoCard;
