import React from 'react'
//import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Route, MemoryRouter, Link as RouterLink } from 'react-router-dom'
import routes from '../routes'

const LinkRouter = (props) => <Link {...props} component={RouterLink} />

export default function SimpleBreadcrumbs() {
  return (
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <Toolbar className="breadcrumbs-test">
        <Route>
          {({ location }) => {
            const pathnames = location.pathname.split('/').filter((x) => x)

            return (
              <Breadcrumbs aria-label="breadcrumb">
                <LinkRouter color="inherit" to="/">
                  Home
                </LinkRouter>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`

                  return last ? (
                    <Typography color="textPrimary" key={to}>
                      {routes[to]}
                    </Typography>
                  ) : (
                    <LinkRouter color="inherit" to={to} key={to}>
                      {routes[to]}
                    </LinkRouter>
                  )
                })}
              </Breadcrumbs>
            )
          }}
        </Route>
      </Toolbar>
    </MemoryRouter>
  )
}
