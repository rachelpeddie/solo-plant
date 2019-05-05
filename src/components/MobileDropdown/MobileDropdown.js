import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import { FaPlus, FaBars, FaTint } from 'react-icons/fa';

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

    handleClose = event => {
        console.log(`event.target is`, event.target.getAttribute('name'));
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

                <IconButton
                    buttonRef={node => {
                        this.anchorEl = node;
                    }}
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this.props.user && this.handleToggle}
                    id="dropdown-menu"
                    className='nav-right'>
                    <MoreVertIcon />
                </IconButton>

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
                                        {/* Nav options if logged in */}
                                        {this.props.user ?
                                            <MenuItem onClick={this.handleClose}>
                                                <Link className="nav-link" to="/addPlant">
                                                    <div><FaPlus /> Add Plant </div>
                                                </Link>
                                            </MenuItem>
                                        : null}
                                        {this.props.user ?
                                            <MenuItem onClick={this.handleClose}>
                                                <Link className="nav-link" to="/allPlants">
                                                    <div><FaBars /> Plant Inventory</div>
                                                </Link>
                                            </MenuItem>
                                        : null}
                                        {this.props.user ?
                                            <MenuItem onClick={this.handleClose}>
                                                <Link className="nav-link" to="/home">
                                                    <div><div><FaTint />Dashboard</div> </div>
                                                </Link>
                                            </MenuItem>
                                            : null}
                                        {/* Nav options if not logged in */}
                                        {this.props.user ? null :
                                            <MenuItem onClick={this.handleClose}>
                                                <Link className="nav-link" to="/home">
                                                    Login / Register
                                                </Link>
                                            </MenuItem>
                                        }
                                        {this.props.user ? null :
                                            <MenuItem onClick={this.handleClose}>
                                                <Link className="nav-link" to="/about">
                                                    About
                                                </Link>
                                            </MenuItem>
                                        }
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