import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import MyProfileDetailedView from '../MyProfileDetailedView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MyProfile extends Component {
  state = {
    data: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchProfileDetails()
  }

  fetchProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        posts: data.profile.posts.map(each1 => ({
          id: each1.id,
          image: each1.image,
        })),
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        stories: data.profile.stories.map(each2 => ({
          id: each2.id,
          image: each2.image,
        })),
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
      }

      this.setState({data: updatedData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRenderProfileView = () => {
    const {data} = this.state
    return (
      <ul>
        <MyProfileDetailedView each={data} />
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  retryProfileView = () => {
    this.fetchProfileDetails()
  }

  onGetProfileFailureView = () => (
    <div className="failure-button-container">
      <img
        src="https://res.cloudinary.com/dokmqwgaw/image/upload/v1646457137/something_went_wrong_camwyp.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button
        className="failure-button"
        type="button"
        onClick={this.retryProfileView}
      >
        Try again
      </button>
    </div>
  )

  renderDisplayedProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onRenderProfileView()
      case apiStatusConstants.failure:
        return this.onGetProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderDisplayedProfile()}
      </div>
    )
  }
}

export default MyProfile
