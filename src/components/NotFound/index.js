// eslint-disable-next-line
import Cookies from 'js-cookie'
// eslint-disable-next-line
import {Redirect} from 'react-router-dom'
import './index.css'

const notFoundImage =
  'https://res.cloudinary.com/dokmqwgaw/image/upload/v1646457137/page_not_found_uqzrfx.png'

const NotFound = props => {
  const navigateToHomeRoute = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <>
      <div className="not-found-container">
        <div className="not-found-image-container">
          <img
            className="not-found-image"
            src={notFoundImage}
            alt="page not found"
          />
        </div>
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-paragraph">
          we are sorry, the page you requested could not be found
        </p>
        <div>
          <button
            className="btn-home"
            onClick={navigateToHomeRoute}
            type="button"
          >
            Home Page
          </button>
        </div>
      </div>
    </>
  )
}

export default NotFound
