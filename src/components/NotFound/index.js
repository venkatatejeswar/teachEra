import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="bg_container">
    <Header />
    <div className="course_failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="notFound"
      />
      <h1 className="failure_title">Page Not Found</h1>
      <p className="failure_desc">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
