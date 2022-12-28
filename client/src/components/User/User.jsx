import React,{useState} from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { followUser ,unfollowUser} from "../../actions/UserAction"

const User = ({follower}) => {
	const [following,setFollowing] = useState(false)
	const dispatch=useDispatch()
	const { user } = useSelector((state) => state.authReducer.authData)
	console.log(user )
	useEffect(() => {
		(user.following.includes(follower._id)) ?setFollowing(true):setFollowing(false);
	}
		,[user])
	console.log(following)
	const handleClick = () => {
		!following?dispatch(followUser(follower._id,user)):dispatch(unfollowUser(follower._id,user))
	}
	return (
		<div className="follower">
			<div>
				<img src={follower.profilePicture?process.env.REACT_APP_PUBLIC_FOLDER+follower.profilePicture:process.env.REACT_APP_PUBLIC_FOLDER+"profileImg.jpg"} alt="" className="followerImage" />
				<div className="name">
					<span>{follower.firstname} {follower.lastname}</span>
					<span>@{follower.username}</span>
				</div>
			</div>
			<button className={!following?"button fc-button":"button fc-button f-button"} onClick={handleClick} >{!following?"Follow":"Unfollow"}</button>
		</div>
	)
}

export default User
