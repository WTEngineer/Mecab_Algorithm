import React from 'react'
//import Routes from "../routes";
import Sidebar from './Sidebar'
import Nav from './Nav'
import { Toolbar } from '@material-ui/core'

function Layout(props) {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Sidebar history={props.history} />
        <div style={{ maxWidth: '800px' }}>
          <Nav />
          <Toolbar />
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Layout
