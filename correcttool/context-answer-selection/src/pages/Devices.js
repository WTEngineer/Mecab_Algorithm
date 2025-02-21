import React from 'react'
import Typography from '@material-ui/core/Typography'
//import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Link from '@material-ui/core/Link'
//import routes from '../routes'
//import Mobile from './Mobile'
//import Desktop from './Desktop'
//import Laptop from './Laptop'
//import Breadcrumbs from '../components/SimpleBreadcrumbs'
//const devicesUrl = matchRoutes(routes, '/devices/:id')
//const mobileUrl = matchRoutes(routes, '/devices/mobile')
//const desktopUrl = matchRoutes(routes, '/devices/desktop')
//const laptopUrl = matchRoutes(routes, '/devices/laptop')

const Devices = ({ route }) => {
  return (
    <div>
      <Typography variant="h3">Devices</Typography>
      <ul>
        <li>
          <Link to="/devices/mobile" color="primary" component={NavLink}>
            Mobile
          </Link>
        </li>
        <li>
          <Link to="/devices/desktop" color="secondary" component={NavLink}>
            Desktop
          </Link>
        </li>
        <li>
          <Link to="/devices/laptop" color="inherit" component={NavLink}>
            Laptop
          </Link>
        </li>
      </ul>
      {renderRoutes(route.routes)}
    </div>
  )
}

export default Devices
