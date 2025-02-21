// /src/App.js
import React, { Component } from 'react'
//import { Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import theme from './theme'
import { renderRoutes } from 'react-router-config'
//import { TopNav } from './components'
import TopNav from './components/TopNav'
import routes from './routes'

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
