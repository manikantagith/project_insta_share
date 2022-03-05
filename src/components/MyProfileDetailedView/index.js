import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import './index.css'

const MyProfileDetailedView = props => {
  const {each} = props
  const {
    followersCount,
    followingCount,
    posts,
    postsCount,
    profilePic,
    stories,
    userBio,
    userId,
    userName,
  } = each

  return (
    <div className="profile-detailed-view-container">
      <div className="user-profile-detail-container">
        <div className="user-profile-container">
          <img className="user-profile-pic" alt="my profile" src={profilePic} />
        </div>
        <div className="user-profile-container-2">
          <h1>{userName}</h1>
          <div className="details-container">
            <p className="p">{postsCount} posts</p>
            <p className="p">{followersCount} followers</p>
            <p>{followingCount} following</p>
          </div>

          <p className="user-id">{userId}</p>
          <p>{userBio}</p>
        </div>
      </div>
      <ul className="profile-stories-icon-container">
        {stories.length !== 0 ? (
          stories.map(each2 => (
            <li key={each2.id}>
              <img
                alt="my story"
                className="stories-icon-profile"
                src={each2.image}
              />
            </li>
          ))
        ) : (
          <div>
            <p>
              <BiCamera />
            </p>
            <p>No Stories Yet</p>
          </div>
        )}
      </ul>
      <hr className="border-line" />
      <div className="posts-container">
        <p>
          <BsGrid3X3 /> Posts
        </p>
      </div>
      <ul className="profile-posts-icon-container">
        {posts.length !== 0 ? (
          posts.map(each3 => (
            <li key={each3.id}>
              <img
                alt="my post"
                className="post-icon-profile"
                src={each3.image}
              />
            </li>
          ))
        ) : (
          <div>
            <p>
              <BiCamera />
            </p>
            <h1>No Posts</h1>
          </div>
        )}
      </ul>
    </div>
  )
}

export default MyProfileDetailedView
