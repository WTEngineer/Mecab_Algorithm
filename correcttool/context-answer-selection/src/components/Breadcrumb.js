import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import routes from '../routes'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Toolbar'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
//import logo from './logo.svg'

const Breadcrumb = ({ locationPath, onMatchedRoutes }) => {
  let matchedRoutes = matchRoutes(routes, locationPath)

  if (typeof onMatchedRoutes === 'function') {
    matchedRoutes = onMatchedRoutes(matchedRoutes)
  }

  return (
    <Toolbar>
      <Breadcrumbs aria-label="breadcrumb">
        {matchedRoutes.map((matchRoute, i) => {
          const { path, breadcrumbName } = matchRoute.route
          const isActive = path === locationPath

          return isActive ? (
            <Link color="textPrimary" component={RouterLink} as="a">
              {breadcrumbName}
            </Link>
          ) : (
            <Link color="inherit" to={path} component={RouterLink} as="a">
              {' '}
              {breadcrumbName}{' '}
            </Link>
          )
        })}
      </Breadcrumbs>
    </Toolbar>
  )
}

export default Breadcrumb
