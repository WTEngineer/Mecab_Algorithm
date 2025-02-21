import About from '../pages/About'
import Color from '../pages/Color'
import React from 'react'
import Home from '../pages/Home'
import Topics from '../pages/Topics'
import Page1 from '../pages/Page-1'
import Page2 from '../pages/Page-2'
import Page3 from '../pages/Page-3'
import Dashboard from '../pages/Dashboard'
//import NotFound from '../pages/NotFound'

const Config = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    route: '/',
    sidebar: () => <div>home!</div>,
    main: () => <Home />
  },
  {
    path: '/color',
    name: 'Color',
    route: '/color',
    sidebar: () => <div>Color~~</div>,
    main: () => <Color />
  },
  {
    path: '/about',
    name: 'About',
    route: '/about',
    sidebar: () => (
      <div>
        <strong>About</strong> page
      </div>
    ),
    main: () => <About />
  },
  {
    path: '/topics',
    name: 'Topics',
    route: '/topics',
    sidebar: () => <div>try it</div>,
    main: () => <Topics />
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    route: '/dashboard',
    sidebar: () => (
      <div>
        This is <strong>Dashboard</strong>
      </div>
    ),
    main: () => <Dashboard />
  },
  {
    path: '/page1',
    name: 'Page 1',
    route: '/page-1',
    sidebar: () => (
      <div>
        page <strong>1</strong>
      </div>
    ),
    main: () => <Page1 />
  },
  {
    path: '/page2',
    name: 'Page 2',
    route: '/page-2',
    sidebar: () => (
      <div>
        page <strong>2</strong>
      </div>
    ),
    main: () => <Page2 />
  },
  {
    path: '/page3',
    name: 'Page 3',
    route: 'page-3',
    sidebar: () => (
      <div>
        page <strong>3</strong>
      </div>
    ),
    main: () => <Page3 />
  }
]

export default Config
