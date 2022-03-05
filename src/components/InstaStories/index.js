import Slider from 'react-slick'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 780,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const InstaStories = props => {
  const {instaStories} = props

  return (
    <div className="slick-container">
      <Slider {...settings}>
        {instaStories.map(each => (
          <div key={each.userId} className="card-post-container">
            <img className="logo-image" src={each.storyUrl} alt="user story" />
            <p>{each.userName}</p>
          </div>
        ))}
      </Slider>
    </div>
  )
}
export default InstaStories
