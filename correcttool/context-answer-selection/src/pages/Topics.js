import React from 'react'
import {
  Link as RouterLink,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom'
//import Breadcrumbs from '../components/SimpleBreadcrumbs'
import Link from '@material-ui/core/Link'

function Topics() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch()

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link
            to={`${url}/rendering`}
            color="secondary"
            component={RouterLink}
          >
            Rendering with React
          </Link>
        </li>
        <li>
          <Link
            to={`${url}/components`}
            color="secondary"
            component={RouterLink}
          >
            Components
          </Link>
        </li>
        <li>
          <Link
            to={`${url}/props-v-state`}
            color="secondary"
            component={RouterLink}
          >
            Props v. State
          </Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  )
}

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams()

  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  )
}

export default Topics
