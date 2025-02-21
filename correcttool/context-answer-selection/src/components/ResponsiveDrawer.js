import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
//import Badge from '@material-ui/core/Badge'
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import PropTypes from "prop-types";
//import MailIcon from '@material-ui/icons/Mail';
//import MenuIcon from '@material-ui/icons/Menu';
//import InboxIcon from '@material-ui/icons/MoveToInbox';
import React from "react";
import {
  //BrowserRouter as Router,
  //Switch,
  //Route,
  Link as RouterLink,
  NavLink,
} from "react-router-dom";
//import clsx from 'clsx'
import { renderRoutes } from "react-router-config";
import routes from "../routes";
//import theme from '../theme'
import ScrollTop from "./ScrollTop";
import MuiIcon30 from "../icons/MuiIcon30";
import MDCIcon30 from "../icons/MDCIcon30";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  search: {
    position: "relative",
    //borderRadius: theme.shape.borderRadius,
    //backgroundColor: fade(theme.palette.common.white, 0.15),
    //'&:hover': {
    //  backgroundColor: fade(theme.palette.common.white, 0.25)
    //},
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  navItem: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  title: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  list: {
    width: drawerWidth,
  },
  fullList: {
    width: "auto",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    width: 40,
    height: 40,
  },
}));

function ListItemLink(props) {
  const { icon, primary, to, open, ...other } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink} {...other}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
        {open != null ? (
          open ? (
            <Icon>expand_less</Icon>
          ) : (
            <Icon>expand_more</Icon>
          )
        ) : null}
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const routeComponents = routes.map(({ path, sidebar, icon }, key) => (
    <ListItemLink to={path} primary={sidebar} icon={icon} key={key} />
  ));
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>{routeComponents}</List>
      <Divider />
      {/* <List>
        <ListItemLink
          to="/devices"
          primary="Devices"
          icon={<Icon>devices_other</Icon>}
          open={!open}
          onClick={handleClick}
        />
        <Collapse component="li" in={!open} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemLink
              to="/devices/mobile"
              icon={<Icon>phone_iphone</Icon>}
              className={classes.nested}
              primary="Mobile"
            />
            <ListItemLink
              to="/devices/desktop"
              icon={<Icon>desktop_mac</Icon>}
              className={classes.nested}
              primary="Desktop"
            />
            <ListItemLink
              to="/devices/laptop"
              icon={<Icon>laptop_mac</Icon>}
              className={classes.nested}
              primary="Laptop"
            />
          </List>
        </Collapse>
      </List> */}
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>handleMenuClose</MenuItem>
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
  );

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <Icon>menu</Icon>
            </IconButton>
            <Link to="/" component={NavLink} className={classes.title}>
              <img
                alt="logo"
                src={process.env.PUBLIC_URL + "/logo.svg"}
                className={classes.logo}
              />
            </Link>
            <Typography variant="h6" className={classes.title} noWrap>
              React
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
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
              {/* <Link
                to="/about"
                component={NavLink}
                variant="button"
                color="inherit"
                className="normal"
                activeClassName="active"
              >
                About
              </Link>
              <Link
                to="/color"
                component={NavLink}
                variant="button"
                color="inherit"
                className="normal"
                activeClassName="active"
              >
                Color
              </Link>
              <Link
                to="/color"
                component={NavLink}
                variant="button"
                color="inherit"
                className="normal"
                activeClassName="active"
              >
                Colsdfor
              </Link>
              <Link
                to="/topics"
                component={NavLink}
                variant="button"
                color="inherit"
                className="normal"
                activeClassName="active"
              >
                Topics
              </Link>
              <Link
                to="/devices"
                component={NavLink}
                variant="button"
                color="inherit"
                className="normal"
                activeClassName="active"
              >
                Devices
              </Link> */}
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
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <Container maxWidth="md" component="main" className={classes.content}>
          <Toolbar className={classes.toolbar} id="back-to-top-anchor" />
          {renderRoutes(routes)}
        </Container>
      </div>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <Icon>keyboard_arrow_up</Icon>
        </Fab>
      </ScrollTop>
    </div>
  );
}

export default ResponsiveDrawer;
