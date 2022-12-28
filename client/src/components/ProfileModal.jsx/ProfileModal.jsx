import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import { updateUser } from "../../actions/UserAction";
import {uploadImage} from '../../actions/uploadAction'
function ProfileModal({ modalOpened,setModalOpened,data }) {
  const theme = useMantineTheme();

  const [formData,setFormData] = useState(data )
  const [profileImage,setProfileImage] = useState(null)
  const [coverImage,setCoverImage] = useState(null)
  const param=useParams()
  const dispatch = useDispatch()
  
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]){
      let img = e.target.files[0];
      
      e.target.name==='profileImage'?setProfileImage(img):setCoverImage(img)
    }
  }
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let userData = formData
    if (profileImage) {
      let data = new FormData()
      const fileName = Date.now() + profileImage.name
      data.append("name",fileName)
      data.append("file",profileImage)
      userData.profilePicture = fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      userData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id,userData))
    setModalOpened(false)
  }
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your info</h3>

        <div>
          <input
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
          />

          <input
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
          />
        </div>

        <div>
          <input
            value={formData.worksAt}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
          />
        </div>

        <div>
          <input
            value={formData.livesIn}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="Lives in"
          />

          <input
            value={formData.country}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
          />
        </div>

        <div>
          <input
            value={formData.relationship}
            onChange={handleChange}
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
            name="relationship"
          />
        </div>
        {/* <div>
          <input
            value={formData.password}
            required
            onChange={handleChange}
            type="password"
            className="infoInput"
            placeholder="password"
            name="password"
          />
        </div> */}


        <div>
            Profile Image 
            <input type="file" name='profileImage' onChange={onImageChange}/>
            Cover Image
            <input type="file" name="coverImage" onChange={onImageChange}/>
        </div>

        <button className="button infoButton" type="submit">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
