import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// material ui styles
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Downshift from 'downshift';

const moment = require('moment');

const styles = theme => ({
    container: {
        position: 'relative',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 'auto',
        right: 'auto',
        // width: 200,
    },
    description: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
        height: 40,
    },
    cssLabel: {
        color: '#425757',
        '&$cssFocused': {
            color: '#9db1b1;',
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:before': {
            borderBottomColor: '#425757',
        },
        '&:after': {
            borderBottomColor: '#9db1b1;',
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: '#9db1b1;',
        },
    },
});

class AddPlant extends Component {

    state = {
        newPlant: {
            type: '',
            nickname: '',
            image: '',
            days: '',
            sun_id: '',
            room_id: '',
            last_watered: moment().format(),
            date_added: moment().format()
        },
        result: [],
        plantAdded: ['']
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_ROOMS' });
        this.props.dispatch({ type: 'GET_SUN' });
    }

    getInfo = () => {
        console.log( 'adsf');
        axios.get('/api/search', { params: { search: this.state.newPlant.type} })
            .then(({ data }) => {
                console.log(`woot, got the plant stuff!`, data);
                this.setState({
                    result: data                            
                })
            })
    }

    handleChangeFor = propertyName => event => {
        this.setState({
            newPlant: {
                ...this.state.newPlant,
                [propertyName]: event.target.value
            },
        }, () => {
            console.log( 'zdffd' );
            if (this.state.newPlant.type && this.state.newPlant.type.length > 1) {
                        this.getInfo()
            }
        })
        console.log(`this.state.stuff`, this.state);
        
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(`new plant is:`, this.state.newPlant);
        this.state.plantAdded.push(this.state.newPlant);
        this.props.dispatch({ type: 'ADD_PLANT', payload: this.state.newPlant });
        this.setState({
            newPlant: {
                type: '',
                nickname: '',
                image: '',
                days: '',
                sun_id: '',
                room_id: '',
                last_watered: moment().format(),
                date_added: moment().format()
            },

        })
    }

    render() {
        const lastPlant = this.state.plantAdded.length - 1;
        const { classes } = this.props;

        return (
            <div>
                <pre>{JSON.stringify(this.state.plantAdded)}</pre> 
                <center>
                    
                    <form className={classes.container} noValidate>
                    
                        <div>
                            <TextField
                                id="standard-with-placeholder"
                                label="Plant Search"
                                value={this.state.newPlant.type}
                                // ref={input => this.search = input}
                                type="text"
                                placeholder="Search for a plant..."
                                className={classes.textField}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        underline: classes.cssUnderline,
                                    },
                                }}
                                margin="normal"
                                required
                                onChange={this.handleChangeFor('type')}
                            />
                            
                        <Downshift id="downshift-simple">
                        <Paper className={classes.paper} square>
                            {this.state.result.filter(plant => plant.common_name != null).map((plant, i) =>
                            // conditionally render this to not include null values for common name
                            
                                <MenuItem
                                    value={plant.common_name}
                                    onClick={this.handleChangeFor('type')}
                                    key={i}
                                >
                                    {plant.common_name}
                                </MenuItem>
                               
                            
                            )}
                        </Paper>
                                </ Downshift>
                            
                        </div>
                        <div>
                            <TextField
                                id="standard-with-placeholder"
                                label="Plant Nickname"
                                type="text"
                                placeholder="Nickname"
                                value={this.state.newPlant.nickname}
                                className={classes.textField}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        underline: classes.cssUnderline,
                                    },
                                }}
                                margin="normal"
                                required
                                onChange={this.handleChangeFor('nickname')}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-with-placeholder"
                                label="Image"
                                type="url"
                                placeholder="Image URL"
                                value={this.state.newPlant.image}
                                className={classes.textField}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        underline: classes.cssUnderline,
                                    },
                                }}
                                margin="normal"
                                required
                                onChange={this.handleChangeFor('image')}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-number"
                                label="Water Frequency"
                                type="number"
                                value={this.state.newPlant.days}
                                placeholder="Days Between Water"
                                className={classes.textField}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        underline: classes.cssUnderline,
                                    },
                                }}
                                margin="normal"
                                required
                                onChange={this.handleChangeFor('days')}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-select"
                                select
                                label="Select"
                                className={classes.textField}
                                value={this.state.newPlant.sun_id}
                                onChange={this.handleChangeFor('sun_id')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        underline: classes.cssUnderline,
                                    },
                                }}
                                helperText="Please select your plant's sunlight requirements"
                                margin="normal"
                            >
                                {this.props.reduxState.sunReducer.map((sun, i) =>
                                    <MenuItem value={sun.id} key={i}>{sun.light}</MenuItem>
                                )}
                            </TextField>
                        </div>
                        <div>

                            <TextField
                                id="standard-select"
                                select
                                label="Select"
                                className={classes.textField}
                                value={this.state.newPlant.room_id}
                                onChange={this.handleChangeFor('room_id')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        underline: classes.cssUnderline,
                                    },
                                }}
                                helperText="Please select the room where your plant lives"
                                margin="normal"
                            >
                                {this.props.reduxState.roomReducer.map((room, i) =>
                                    <MenuItem value={room.id} key={i}>{room.name}</MenuItem>
                                )}
                            </TextField>
                        </div>
                        {/* <pre>{JSON.stringify(this.state.newPlant)}</pre> */}
                        <div><button onClick={this.handleSubmit} id='add-plant-btn'>Add Plant </button></div>

                    </form>
                    {this.state.plantAdded.length === 1 ? null : <p id='last-plant'><span id='just-added'>{this.state.plantAdded[lastPlant].nickname}</span> has been added to the family!  Don't forget to water them.</p>}
                </center>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})

AddPlant.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapReduxStateToProps)(withStyles(styles)(AddPlant));