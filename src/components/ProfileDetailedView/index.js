import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './index.css'

const ProfileDetailedView = props => {
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
        <div>
          <img
            className="user-profile-pic"
            alt="user profile"
            src={profilePic}
          />
        </div>
        <div>
          <div>
            <h1>{userName}</h1>
          </div>
          <div className="user-details-container">
            <div>
              <p>{postsCount} posts</p>
            </div>
            <div>
              <p>{followersCount} followers</p>
            </div>
            <div>
              <p>{followingCount} following</p>
            </div>
          </div>
          <div>
            <p className="user-id">{userId}</p>
          </div>
          <div>
            <p className="user-bio">{userBio}</p>
          </div>
        </div>
      </div>

      <ul className="profile-stories-icon-container">
        {stories.length !== 0 ? (
          stories.map(each2 => (
            <li key={each2.id}>
              <img
                alt="user story"
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
          <BsGrid3X3 className="grid" /> Posts
        </p>
      </div>
      <ul className="profile-posts-icon-container">
        {posts.length !== 0 ? (
          posts.map(each3 => (
            <li key={each3.id}>
              <img
                alt="user post"
                className="post-icon-profile"
                src={each3.image}
              />
            </li>
          ))
        ) : (
          <div className="no-post-container">
            <div className="camera-background">
              <BiCamera className="camera" />
            </div>
            <h1 className="no-posts">No Posts</h1>
          </div>
        )}
      </ul>
    </div>
  )
}

export default ProfileDetailedView
