import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItem extends Component {
  state = {courseDetails: {}, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.renderCourseDetails()
  }

  renderCourseDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
      }

      this.setState({
        courseDetails: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onRetry = () => {
    this.renderCourseDetails()
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#64748b" height={50} width={50} />
    </div>
  )

  renderCourse = () => {
    const {courseDetails} = this.state
    return (
      <div className="course_container">
        <img
          src={courseDetails.imageUrl}
          alt={courseDetails.name}
          className="image"
        />
        <div className="course_content">
          <h1 className="course_name">{courseDetails.name}</h1>
          <p className="course_desc">{courseDetails.description}</p>
        </div>
      </div>
    )
  }

  renderCourseFailure = () => (
    <div className="course_failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure_title">Oops! Something Went Wrong</h1>
      <p className="failure_desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry_btn" onClick={this.onRetry} type="button">
        Retry
      </button>
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.loading:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderCourse()
      case apiConstants.failure:
        return this.renderCourseFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg_container">
        <Header />
        <div className="courses_container">{this.renderViews()}</div>
      </div>
    )
  }
}

export default CourseItem
