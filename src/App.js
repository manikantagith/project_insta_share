import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import MyProfile from './components/MyProfile'
import ProfileItem from './components/ProfileItem'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/my-profile" component={MyProfile} />
    <ProtectedRoute exact path="/users/:userId" component={ProfileItem} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="bad-path" />
  </Switch>
)

export default App
