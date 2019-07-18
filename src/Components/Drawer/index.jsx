/* eslint-disable max-len */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FormatListBulleted, KeyboardArrowRight } from '@material-ui/icons';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import {
  BrowserRouter as Router, Route, Link, Switch,
} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import _ from 'lodash';


const drawerWidth = 260;

const defaultStyle = {
  hover: { backgroundColor: 'rgba(92, 92, 92, 0.5)' },
  actived: { backgroundColor: 'rgba(92, 92, 92, 0.8)' },
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  color: {
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: 400,
  },
};

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  flexToolbar: {
    display: 'flex',
  },
  drawerPaper: {
    width: drawerWidth,
    boxShadow: '0px 0px 3px #ccc',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  panel: {
    padding: theme.spacing.unit * 2,
  },
  panelItem: {
    width: '94%',
    margin: 'auto 0 10px',
    borderRadius: '0px 30px 30px 0px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
  selectedPanel: {
    '&& > div': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    '& svg, & h6': {
      color: '#000 !important',
    },
  },
  boxShadow: {
    boxShadow: '3px 2px 4px #ccc',
  },
});

const DividerCustom = () => (
  <hr style={{
    width: '100%',
    height: 1,
    margin: '-0.6px',
    border: 'none',
    flexShrink: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  }}
  />
);

class ResponsiveDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerToggle() {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  }

  render() {
    const { mobileOpen } = this.state;
    const { classes } = this.props;
    const {
      panels,
      container,
      renderAppbar,
      basename,
      style,
      renderUpSidebar,
    } = this.props;

    const {
      text,
      hover,
      actived,
      background,
      submenu,
      mainColorPalette,
      secondaryColorPalette,
      iconRightButton,
    } = style;

    // Change Mui Theme Default
    const themeCustomize = createMuiTheme({
      overrides: {
        MuiDrawer: {
          paperAnchorDockedLeft: {
            borderRight: 0,
          },
          paper: {
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: '50%',
            background,
          },
        },

        MuiListItem: {
          button: {
            '&:hover': !_.isEmpty(hover) ? hover : defaultStyle.hover,
            '&:focus': !_.isEmpty(actived) ? actived : defaultStyle.actived,
          },
        },
      },
      typography: {
        useNextVariants: true,
      },
      palette: {
        primary: {
          main: mainColorPalette || '#fff',
        },
        secondary: {
          main: secondaryColorPalette || '#000',
        },
      },
    });
    const subMenus = _.uniq(panels.map(panel => panel.subMenu && panel.subMenu).filter(panel => panel));
    const drawer = (
      <div>
        <div className={classNames(classes.toolbar, classes.flexToolbar)}>
          {renderUpSidebar != null && renderUpSidebar({ classes })}
        </div>
        {
          _.isEmpty(subMenus)
            ? (
              <List
                style={{ padding: '24px 0' }}
              >
                {panels.filter(panel => (!panel.noMenu && !!panel.title)).map(panel => (
                  <NavLink
                    exact
                    to={panel.link}
                    key={panel.title}
                    style={{ textDecoration: 'none' }}
                    activeClassName={classes.selectedPanel}
                  >
                    <ListItem button className={classes.panelItem}>
                      <ListItemIcon style={!_.isEmpty(text) ? text : defaultStyle.text}>{panel.icon || <FormatListBulleted /> }</ListItemIcon>
                      <ListItemText primary={<Typography variant="subtitle2" style={!_.isEmpty(text) ? text : defaultStyle.text}>{panel.title}</Typography>} />
                      {iconRightButton || ''}
                    </ListItem>
                  </NavLink>
                ))}
              </List>
            )
            : (
              subMenus.map(menu => (
                <List
                  key={menu}
                  style={{ padding: '24px 0' }}
                  subheader={(
                    <ListSubheader
                      style={_.isEmpty(submenu) ? {
                        color: 'fff',
                      } : submenu}
                      component="div"
                    >
                      {menu}
                    </ListSubheader>
                  )}
                >
                  {panels.filter(panel => (panel.subMenu === menu && !panel.noMenu && !!panel.title)).map(panel => (
                    <NavLink
                      exact
                      to={panel.link}
                      key={panel.title}
                      style={{ textDecoration: 'none' }}
                      className={classes.itemPanel}
                      activeClassName={classes.selectedPanel}
                    >
                      <ListItem button className={classes.panelItem}>
                        <ListItemIcon style={!_.isEmpty(text) ? text : defaultStyle.text}>{panel.icon || <FormatListBulleted /> }</ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle2" style={!_.isEmpty(text) ? text : defaultStyle.text}>{panel.title}</Typography>} />
                        {iconRightButton || ''}
                      </ListItem>
                    </NavLink>
                  ))}
                </List>
              ))
            )
        }
      </div>
    );

    return (
      <Router basename={basename}>
        <MuiThemeProvider theme={themeCustomize}>
          <div className={classes.root}>
            <CssBaseline />
            {
              renderAppbar != null
              && renderAppbar({
                expand: this.handleDrawerToggle,
              })
            }
            <nav className={classes.drawer}>
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Hidden smUp implementation="css">
                <Drawer
                  container={container}
                  variant="temporary"
                  anchor={themeCustomize.direction === 'rtl' ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={this.handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
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
            <main className={classes.content}>
              {
                renderAppbar != null
                && <div className={classes.toolbar} />
              }
              <Switch>
                {panels.map(p => (
                  <Route
                    exact
                    path={p.link}
                    component={props => (
                      p.noPaper ? (
                        <div className={classes.panel}>
                          {p.view(props)}
                        </div>
                      ) : (
                        <Paper
                          elevation={1}
                          className={classes.panel}
                        >
                          {p.view(props)}
                        </Paper>
                      )
                    )}
                    key={p.title}
                  />
                ))}
              </Switch>
            </main>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

ResponsiveDrawer.defaultProps = {
  container: undefined,
  style: {},
  theme: undefined,
  panels: [],
  renderAppbar: null,
  renderUpSidebar: null,
  basename: '',
  iconRightButton: {},
};

ResponsiveDrawer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  container: PropTypes.shape({}),
  panels: PropTypes.arrayOf(PropTypes.shape({})),
  renderUpSidebar: PropTypes.func,
  renderAppbar: PropTypes.func,
  style: PropTypes.shape({}),
  theme: PropTypes.shape({}),
  basename: PropTypes.string,
  iconRightButton: PropTypes.shape({}),
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);