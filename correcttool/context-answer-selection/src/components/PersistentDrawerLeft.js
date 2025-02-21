import React from 'react'
import clsx from 'clsx'
import { fade, makeStyles, useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Link from '@material-ui/core/Link'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'
//import MenuIcon from '@material-ui/icons/Menu'
//import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
//import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
//import InboxIcon from '@material-ui/icons/MoveToInbox'
//import MailIcon from '@material-ui/icons/Mail'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
  NavLink
} from 'react-router-dom'
import routes from '../routes'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  search: {
    position: 'relative',
    //borderRadius: theme.shape.borderRadius,
    //backgroundColor: fade(theme.palette.common.white, 0.15),
    //'&:hover': {
    //  backgroundColor: fade(theme.palette.common.white, 0.25)
    //},
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  navItem: {
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
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
  },
  list: {
    width: drawerWidth
  },
  fullList: {
    width: 'auto'
  }
}))

function ListItemLink(props) {
  const { icon, primary, to } = props

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  )

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

export default function PersistentDrawerLeft() {
  const classes = useStyles()
  const theme = useTheme()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom'
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <Icon>chevron_left</Icon>
          ) : (
            <Icon>chevron_right</Icon>
          )}
        </IconButton>
      </div>

      <Divider />
      <List>
        <ListItemLink to="/" primary="Home" icon={<Icon>home</Icon>} />
        <ListItemLink to="/about" primary="About" icon={<Icon>help</Icon>} />
        <ListItemLink
          to="/topics"
          primary="Topics"
          icon={<Icon>topics</Icon>}
        />
        <ListItemLink to="/color" primary="Color" icon={<Icon>palette</Icon>} />
        <Divider />
      </List>
      <List>
        <ListItemLink
          to="/page1"
          primary="Page1"
          icon={<Icon>text_snippet</Icon>}
        />
        <ListItemLink
          to="/page2"
          primary="Page2"
          icon={<Icon>text_snippet</Icon>}
        />
        <ListItemLink
          to="/page3"
          primary="Page3"
          icon={<Icon>text_snippet</Icon>}
        />
        <ListItemLink
          to="/dashboard"
          primary="Dashboard"
          icon={<Icon>insert_chart</Icon>}
        />
        <ListItemLink
          to="/electronics"
          primary="Electronics"
          icon={<Icon>devices_other</Icon>}
        />
      </List>
      <Divider />
    </div>
  )

  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
              <IconButton onClick={toggleDrawer(anchor, true)}>
                <Icon>menu</Icon>
              </IconButton>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}

          <Typography className={classes.title} variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <div className={classes.search}>
            <div className={classes.navItem}>
              <Link
                to="/"
                component={NavLink}
                variant="button"
                color="inherit"
                className="normal"
                activeClassName="active"
              >
                Home
              </Link>
              <Link
                to="/about"
                component={NavLink}
                variant="button"
                color="inherit"
                className="normal"
                activeClassName="active"
              >
                About
              </Link>
            </div>
          </div>
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
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <Icon>chevron_left</Icon>
            ) : (
              <Icon>chevron_right</Icon>
            )}
          </IconButton>
        </div>
        <div className={classes.fullList}>
          <Divider />

          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <Icon>move_to_inbox</Icon>
                  ) : (
                    <Icon>mail_outline</Icon>
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  )
}
