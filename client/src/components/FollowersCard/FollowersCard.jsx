import React, { useState } from 'react'
import './FollowersCard.css'
import * as UserApi from '../../api/UserRequest'
import { Followers } from '../../Data/FollowersData'
import User from '../User/User'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
const FollowersCard = () => {
    const[followers,setFollowers]=useState([])
    useEffect(() => {
        const fetchFollowers = async () => {
            const {data} = await UserApi.getUsers()
          
            setFollowers(data)
        }
        fetchFollowers()
    },[])
    const {user}=useSelector((state)=>state.authReducer.authData)
    console.log(followers)
    return (
        <div className="FollowersCard">
            <h3>People you may know</h3>

            {followers && followers.map((follower) => {
                return follower._id !== user._id ?
               ( <User follower={follower} key={follower._id} />
                   )
                   : ''
            })}
        </div>
  )
}

export default FollowersCard