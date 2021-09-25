import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Navbar from '../Navbar/Navbar'
import Userstats from '../Userstats/Userstats'
import Gallery from '../Gallery/Gallery'
import './Profile.scss'

const Profile = () => {
    const [currentUser, setCurrentUser] = useState([])
    const [currUserPosts, setCurrUserPosts] = useState([])
    const [totalFollowings, setTotalFollowings] = useState(0)
    const [totalFollowers, setTotalFollowers] = useState(0)
    const [isFollowing, setIsFollowing] = useState(null)
    const { username } = useParams()
    const { user } = useAuth()

    useEffect(() => {
        const get_current_user = async() => {
            const response = await axios.get(`http://localhost:8080/users/${username}`)
            setCurrentUser(response.data)
        }
        get_current_user()
    },[username])
    
    useEffect(() => {
        const get_current_user_posts = async() => {
            const response = await axios.get(`http://localhost:8080/posts/${username}`)
            setCurrUserPosts(response.data)
        }
        get_current_user_posts()
    },[username])

    useEffect(() => {
        const get_current_user_followings = async() => {
            const response = await axios.get(`http://localhost:8080/users/followings/${username}`)
            setTotalFollowings(response.data.length)
        }
        get_current_user_followings()

        const get_current_user_followers = async() => {
            const response = await axios.get(`http://localhost:8080/users/followers/${username}`)
            setTotalFollowers(response.data.length)
        }
        get_current_user_followers()
    }, [username])

    useEffect(() => {
        const chech_admin_isfollowing = async() => {
            const response = await axios.get(`http://localhost:8080/admin/followings/${user.username}`)
            console.log(response.data)
            const u = await response.data.find(u => u.following_username === username)
            if(u !== undefined) {
                if(response.data.find(v => v.following_username === username).following_username) {
                    setIsFollowing(true)
                }
            } else {
                setIsFollowing(false)
            }
        }
        chech_admin_isfollowing()
    },[username, user.username])

    return (
        <>
            <Navbar />
            {currentUser.length && <Userstats img={currentUser[0].user_img} username={username} totalPosts={currUserPosts.length} followers={totalFollowers} followings={totalFollowings} fullName={currentUser[0].full_name} userId={currentUser[0].id} isFollowing={isFollowing} isAdmin={user} />}
            {currUserPosts.length && <Gallery posts={currUserPosts} />}
        </>
    )
}

export default Profile