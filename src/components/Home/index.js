import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import InstaStories from '../InstaStories'
import PostItem from '../PostItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    data: [],
    apiStatus: apiStatusConstants.initial,
    instaStories: [],
    apiStatusStories: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.renderSuccessViewPost()
    this.renderSuccessViewStories()
  }

  renderSuccessViewStories = async () => {
    this.setState({apiStatusStories: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.users_stories.map(each4 => ({
        storyUrl: each4.story_url,
        userId: each4.user_id,
        userName: each4.user_name,
      }))
      this.setState({
        apiStatusStories: apiStatusConstants.success,
        instaStories: updatedData,
      })
    } else {
      this.setState({apiStatusStories: apiStatusConstants.failure})
    }
  }

  userEnteredSearchedValue = search => {
    this.setState({searchInput: search}, this.renderSuccessViewPost)
  }

  renderSuccessViewPost = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = data.posts.map(eachPost => ({
        comments: eachPost.comments.map(eachComment => ({
          userName: eachComment.user_name,
          userId: eachComment.user_id,
          comment: eachComment.comment,
        })),
        createdAt: eachPost.created_at,
        likesCount: eachPost.likes_count,
        postDetailsCaption: eachPost.post_details.caption,
        postDetailsImageUrl: eachPost.post_details.image_url,
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
      }))
      this.setState({data: updateData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRenderPostView = () => {
    const {data, searchInput} = this.state

    return (
      <div className="post-main-card">
        <ul className="post-container">
          {searchInput !== '' && <h1>Search Results</h1>}
          {data.map(post => (
            <PostItem
              searchInput={searchInput}
              postData={post}
              key={post.postId}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader
        testid="loader"
        type="TailSpin"
        color="#4094EF"
        height={50}
        width={50}
      />
    </div>
  )

  onRenderStoryView = () => {
    const {instaStories, searchInput} = this.state
    return (
      <div>
        {searchInput === '' && (
          <ul className="story-container">
            <InstaStories instaStories={instaStories} />
          </ul>
        )}
      </div>
    )
  }

  onRetryPost = () => this.renderSuccessViewPost()

  onRetryStory = () => this.renderSuccessViewStories()

  onGetPostFailureView = () => (
    <div className="failure-button-container">
      <img
        src="https://res.cloudinary.com/dokmqwgaw/image/upload/v1646457137/something_went_wrong_camwyp.png"
        alt="failure view"
        className="mobile-width"
      />
      <p>Something went wrong. Please try again</p>
      <button
        className="failure-button"
        type="button"
        onClick={this.onRetryPost}
      >
        Try again
      </button>
    </div>
  )

  onGetStoryFailureView = () => (
    <div className="failure-button-container">
      <img
        src="https://res.cloudinary.com/dokmqwgaw/image/upload/v1646457137/something_went_wrong_camwyp.png"
        alt="failure view"
        className="mobile-width"
      />
      <p>Something went wrong. Please try again</p>
      <button
        className="failure-button"
        type="button"
        onClick={this.onRetryStory}
      >
        Try again
      </button>
    </div>
  )

  renderEmptyView = () => {
    const {data, searchInput} = this.state
    if (data.length === 0 && searchInput !== '') {
      return (
        <div className="zero-search-result">
          <img
            src="https://res.cloudinary.com/dokmqwgaw/image/upload/v1646457138/search_not_found_jaaqjk.png"
            alt="search not found"
          />
          <h1>Search Not Found</h1>
          <p>Try different keyword or search again</p>
        </div>
      )
    }
    return null
  }

  renderDisplayedPost = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onRenderPostView()
      case apiStatusConstants.failure:
        return this.onGetPostFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderDisplayedStories = () => {
    const {apiStatusStories} = this.state
    switch (apiStatusStories) {
      case apiStatusConstants.success:
        return this.onRenderStoryView()
      case apiStatusConstants.failure:
        return this.onGetStoryFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <Header userEnteredSearchedValue={this.userEnteredSearchedValue} />
        {this.renderDisplayedStories()}
        {this.renderDisplayedPost()}

        <div>{this.renderEmptyView()}</div>
      </div>
    )
  }
}

export default Home
