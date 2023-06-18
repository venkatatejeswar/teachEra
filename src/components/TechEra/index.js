import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../Header'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TechEra extends Component {
  state = {courseList: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.renderCourses()
  }

  renderCourses = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(course => ({
        id: course.id,
        logoUrl: course.logo_url,
        name: course.name,
      }))
      this.setState({courseList: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onRetry = () => {
    this.renderCourses()
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="BallTriangle" color="#64748b" height={50} width={50} />
    </div>
  )

  renderCoursesList = () => {
    const {courseList} = this.state
    return (
      <div className="home_courses_cont">
        <h1 className="home_title">Courses</h1>
        <ul className="courses_list">
          {courseList.map(course => (
            <Link to={`/courses/${course.id}`} className="link" key={course.id}>
              <li className="course_item">
                <img src={course.logoUrl} alt={course.name} />
                <p className="course_name">{course.name}</p>
              </li>
            </Link>
          ))}
        </ul>
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
      <button className="retry_btn" type="button" onClick={this.onRetry}>
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
        return this.renderCoursesList()
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
        <div className="home_courses_container">{this.renderViews()}</div>
      </div>
    )
  }
}

export default TechEra
