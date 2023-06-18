import './App.css'
import {Switch, Route} from 'react-router-dom'
import TechEra from './components/TechEra'
import CourseItem from './components/CourseItem'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={TechEra} />
    <Route exact path="/courses/:id" component={CourseItem} />
    <Route component={NotFound} />
  </Switch>
)

export default App
