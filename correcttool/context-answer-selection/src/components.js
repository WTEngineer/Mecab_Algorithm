// /src/components.js

import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Link from '@material-ui/core/Link'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
//import logo from './logo.svg'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
    //width: `calc(100% - ${drawerWidth}px)`,
    //marginLeft: drawerWidth
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}))

function TopNav() {
  const classes = useStyles()

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          aria-label="go to google account"
          color="inherit"
          href="https://accounts.google.com/AddSession?hl=zh-TW&continue=https://www.google.com/"
          target="_blank"
          rel="noopener"
        >
          <Icon>exit_to_app</Icon>
        </IconButton>
        <p>Login</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <Icon>mail_outline</Icon>
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <Icon>notifications</Icon>
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Icon>account_circle</Icon>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  const DrawerToggle = (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      className={classes.menuButton}
    >
      <Icon>menu</Icon>
    </IconButton>
  )

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
          ></Typography>
          <Navbar.Brand to="/">
            <img
              src={process.env.PUBLIC_URL + '/logo.svg'}
              alt="react-router-breadcrumb"
              className="d-inline-block align-top"
              width="30"
              height="30"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item>
                <Nav.Link as="div">
                  <Link to="/" component={RouterLink} color="textPrimary">
                    Home
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as="div">
                  <Link to="/topics" component={RouterLink} color="textPrimary">
                    Topics
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as="div">
                  <Link to="/about" component={RouterLink} color="textPrimary">
                    About
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as="div">
                  <Link to="/color" component={RouterLink} color="textPrimary">
                    Color
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as="div">
                  <Link to="/books" component={RouterLink} color="textPrimary">
                    Books
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <NavDropdown title="Electronics" id="basic-nav-dropdown">
                <NavDropdown.Item as="div">
                  <Link
                    className="dropdown-item"
                    to="/electronics/mobile"
                    component={RouterLink}
                  >
                    Mobile Phone
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="div">
                  <Link
                    className="dropdown-item"
                    to="/electronics/desktop"
                    component={RouterLink}
                  >
                    Desktop PC
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as="div">
                  <Link
                    className="dropdown-item"
                    to="/electronics/laptop"
                    component={RouterLink}
                  >
                    Laptop
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <Icon>mail_outline</Icon>
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <Icon>notifications</Icon>
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Icon>account_circle</Icon>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <Icon>more_vert</Icon>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Navbar>
  )
}

export { TopNav }
