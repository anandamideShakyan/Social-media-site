import React from 'react'
import './Posts.css'
import { getTimelinePosts } from '../../actions/postAction.js'
import {useDispatch,useSelector} from 'react-redux'
import Post from '../Post/Post'
import { useEffect } from 'react'
const Posts = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  const { posts,loading } = useSelector((state) => state.postReducer)
  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  },[])
  return (
    <div className="Posts">
        {posts.map((post, id)=>{
          return <Post data={post} id={id} key={post._id} />
        })}
    </div>
  )
}

export default Posts