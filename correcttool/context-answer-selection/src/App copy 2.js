// /src/App.js
//import { Route, MemoryRouter, Link as RouterLink } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { ThemeProvider } from '@material-ui/core/styles'
//import Typography from '@material-ui/core/Typography'
//import Link from '@material-ui/core/Link'
import Toolbar from '@material-ui/core/Toolbar'
import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
//import { TopNav } from './components'
import TopNav from './components/TopNav'
//import Breadcrumbs from './components/SimpleBreadcrumbs'
import routes from './routes'
import theme from './theme'


class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="container">
          <TopNav />
          <Toolbar />
          <main className="main">
            <Container maxWidth="md">{renderRoutes(routes)}</Container>
          </main>
        </div>
      </ThemeProvider>
    )
  }
}

export default App
