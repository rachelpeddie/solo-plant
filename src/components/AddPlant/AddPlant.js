import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// material ui styles
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const moment = require('moment');

const styles = theme => ({
    container: {
        // display: 'flex',
        // flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
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
        query: '',
        result: [],
        plantAdded: ['']
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_ROOMS' });
        this.props.dispatch({ type: 'GET_SUN' });
    }

    getInfo = () => {
        axios.get(`/water`, { params: { search: this.state.query } })
            .then(({ data }) => {
                console.log(`woot, got the plant stuff!`, data);
                this.setState({
                    result: data // MusicGraph returns an object named data, 
                    // as does axios. So... data.data                             
                })
            })
    }

    handleChangeFor = propertyName => event => {
        this.setState({
            newPlant: {
                ...this.state.newPlant,
                [propertyName]: event.target.value
            },
            
                query: this.search.value
            }, () => {
                if (this.state.query && this.state.query.length > 1) {
                    if (this.state.query.length % 2 === 0) {
                        this.getInfo()
                    }
                }
            
        })
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
                {/* <pre>{JSON.stringify(this.state.plantAdded)}</pre>  */}
                <center>

                    <form className={classes.container} noValidate>
                        <div>
                            <TextField
                                id="standard-with-placeholder"
                                label="Plant Search"
                                ref={input => this.search = input}
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
                        </div>
                        <ul>
                            {this.state.result.map((plant, i) =>
                                <li key={i}>
                                    {plant.common_name}
                                </li>
                            )}
                        </ul>
                        <div>
                            <TextField
                                id="standard-with-placeholder"
                                label="Plant Nickname"
                                type="text"
                                placeholder="Nickname"
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