import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import { FaSeedling, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const styles = theme => ({
    root: {
        display: 'inline'
    },
    paper: {
        marginRight: theme.spacing.unit * 2,
    },
    menu: {
        // backgroundColor: '#425757',
    },
    menuItem: {
        color: '#6f9999;',
    }

});

class Dropdown extends React.Component {
    state = {
        open: false,
    };

    // logout = () => {
    //     this.props.dispatch({ type: 'LOGOUT' });
    //     this.props.history.push('/');
    //     this.handleClose();
    // }

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = name => event =>  {
        console.log(`event.target is`, name);

        if (name === 'account') {
            this.props.history.push('/accountInfo')
        }
        else if (name === 'about') {
            this.props.history.push('/about')
        }
        else if( name === 'logout'){
            this.props.dispatch({ type: 'LOGOUT' });
            this.props.history.push('/');
        }
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>

                    <Button
                        buttonRef={node => {
                            this.anchorEl = node;
                        }}
                        aria-owns={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                    onClick={this.props.user && this.handleToggle}
                    id="dropdown-menu"
                    >
                    <div><FaSeedling /> PlantIt</div>
          </Button>

                    <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                            <Paper className={classes.menu}>
                                    <ClickAwayListener onClickAway={this.handleClose}>
                                        <MenuList>
                                            <MenuItem name="about" onClick={this.handleClose('about')} className={classes.menuItem}>             <p><FaSeedling className='vertical-align' /> About PlantIt</p> 
                                            </MenuItem>
                                            <MenuItem name="account" onClick={this.handleClose('account')} className={classes.menuItem}>
                                                <p><FaUserCircle className='vertical-align' /> Account Info</p>
                                            </MenuItem>
                                            <MenuItem name="logout" onClick={this.handleClose('logout')} className={classes.menuItem}>
                                                <p><FaSignOutAlt className='vertical-align' /> Log Out </p>
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
        );
    }
}

Dropdown.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(Dropdown)));