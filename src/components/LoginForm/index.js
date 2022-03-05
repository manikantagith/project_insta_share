import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  // eslint-disable-next-line
  state = {username: '', password: '', showSubmitError: false, errorMSg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    if (jwtToken !== undefined) {
      const {history} = this.props
      console.log(this.props)
      history.replace('/')
    }
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onGetUsername = event => {
    this.setState({username: event.target.value})
  }

  onGetPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="login-image">
          <img
            className="image-login-logo"
            src="https://res.cloudinary.com/dokmqwgaw/image/upload/v1646457015/insta_login_hkfpsu.png"
            alt="website login"
          />
        </div>
        <div>
          <form className="form-login" onSubmit={this.onSubmitLoginForm}>
            <div className="mini-containers-Insta-heading">
              <div>
                <img
                  className="insta-icon"
                  alt="website logo"
                  src="https://res.cloudinary.com/dokmqwgaw/image/upload/v1646457137/login_logo_wwtmg9.png"
                />
              </div>

              <h1 className="insta-share-heading">Insta Share</h1>
            </div>
            <div className="user-filed-container">
              <div>
                <label className="insta-share-label" htmlFor="username">
                  USERNAME
                </label>
                <br />
                <input
                  className="insta-share-input"
                  type="text"
                  id="username"
                  value={username}
                  onChange={this.onGetUsername}
                  placeholder="username"
                />
              </div>
              <div>
                <label className="insta-share-label" htmlFor="password">
                  PASSWORD
                </label>
                <br />
                <input
                  className="insta-share-input"
                  type="password"
                  onChange={this.onGetPassword}
                  placeholder="password"
                  id="password"
                  value={password}
                />
              </div>
              <button className="login-button" type="submit">
                Login
              </button>
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
