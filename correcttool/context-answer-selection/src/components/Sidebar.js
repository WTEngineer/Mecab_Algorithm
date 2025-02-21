import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Config from './Config'
import { Link, useLocation } from 'react-router-dom'
import { Toolbar } from '@material-ui/core'
import theme from '../theme'

function Sidebar(props, { defaultActive }) {
  const location = useLocation()
  const lastActiveIndexString = localStorage.getItem('lastActiveIndex')
  const lastActiveIndex = Number(lastActiveIndexString)
  const [activeIndex, setActiveIndex] = useState(
    lastActiveIndex || defaultActive
  )

  function changeActiveIndex(newIndex) {
    localStorage.setItem('lastActiveIndex', newIndex)
    setActiveIndex(newIndex)
  }

  function getPath(path) {
    if (path.charAt(0) !== '/') {
      return '/' + path
    }
    return path
  }

  useEffect(() => {
    const activeItem = Config.findIndex(
      (item) => getPath(item.route) === getPath(location.pathname)
    )
    changeActiveIndex(activeItem)
  }, [location])

  return (
    <>
      <SidebarParent>
        <div style={{ position: 'fixed' }}>
          <Toolbar style={theme.mixins.toolbar} />
          {Config.map((item, index) => {
            return (
              <Link to={item.route}>
                <SidebarItem key={item.name} active={index === activeIndex}>
                  <p>{item.name}</p>
                </SidebarItem>
              </Link>
            )
          })}
        </div>
        <div className="behind-the-scenes" />
      </SidebarParent>
    </>
  )
}

export default Sidebar

const drawerWidth = 240

const SidebarParent = styled.div`
  /*background: #cf3d2a;*/

  a {
    text-decoration: none;
  }

  & > div {
    width: ${drawerWidth}px;
    height: 100vh;
  }

  .behind-the-scenes {
    width: ${drawerWidth}px;
  }
`

const SidebarItem = styled.div`
  padding: 16px 24px;
  transition: all 0.25s ease-in-out;
  background: ${(props) => (props.active ? 'rgba(255, 255, 255, 0.08)' : '')};
  margin: 4px 12px;
  border-radius: 4px;

  p {
    color: white;
    font-weight: bold;
    text-decoration: none;
  }

  &:hover {
    cursor: pointer;
  }

  &:hover:not(:first-child) {
    background: #c34a36;
  }
`
