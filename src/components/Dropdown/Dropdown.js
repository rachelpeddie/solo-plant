import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import LogOutButton from '../LogOutButton/LogOutButton';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import { FaSeedling } from 'react-icons/fa';

const styles = theme => ({
    root: {
        display: 'inline'
    },
    paper: {
        marginRight: theme.spacing.unit * 2,
    },

});

class Dropdown extends React.Component {
    state = {
        open: false,
    };

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = event =>  {
        console.log(`event.target is`, event.target.getAttribute('name'));
        if (event.target.getAttribute('name') === 'account') {
            this.props.history.push('/accountInfo')
        }
        else if (event.target.getAttribute('name') === 'about') {
            this.props.history.push('/about')
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
                                <Paper>
                                    <ClickAwayListener onClickAway={this.handleClose}>
                                        <MenuList>
                                            <MenuItem name="about" onClick={this.handleClose}>About PlantIt</MenuItem>
                                        <MenuItem name="account" onClick={this.handleClose}>Account Info</MenuItem>
                                        <MenuItem onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
                                                Log Out

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