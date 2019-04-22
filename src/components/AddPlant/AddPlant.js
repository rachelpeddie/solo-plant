import React, { Component } from 'react';
import { connect } from 'react-redux';


// material ui styles
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { teal } from '@material-ui/core/colors';

const moment = require('moment');

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
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
});

class AddPlant extends Component {

    state = {
        newPlant: {
            type: '',
            nickname: '',
            image: '',
            days_to_water: '',
            sun_id: '',
            room_id: '',
            date_added: moment().format()
        }
    }

    componentDidMount = () => {
        this.props.dispatch({type: 'GET_ROOMS'});
        this.props.dispatch({type: 'GET_SUN'});
    }

    handleChangeFor = propertyName => event => {
        this.setState({
            newPlant:{
                ...this.state.newPlant,
                [propertyName]: event.target.value
            }
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_PLANT', payload: this.state.newPlant });
    }
    
    render(){

        const { classes } = this.props;

        return(
            <form className={classes.container} noValidate>

                <TextField
                    id="standard-with-placeholder"
                    label="Name of Plant"
                    type="text"
                    placeholder="Plant Type"
                    className={classes.textField}
                    margin="normal"
                    required
                    onChange={this.handleChangeFor('type')}
                />

                <TextField
                    id="standard-with-placeholder"
                    label="Plant Nickname"
                    type="text"
                    placeholder="Nickname"
                    className={classes.textField}
                    margin="normal"
                    required
                    onChange={this.handleChangeFor('nickname')}
                />

                <TextField
                    id="standard-with-placeholder"
                    label="Image"
                    type="url"
                    placeholder="Image URL"
                    className={classes.textField}
                    margin="normal"
                    required
                    onChange={this.handleChangeFor('image')}
                />

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
                    helperText="Please select your plant's sunlight requirements"
                    margin="normal"
                >
                    {/* {this.props.reduxState.sunReducer.map((sun, i) =>
                        <MenuItem value={sun.id} key={i}>{sun.name}</MenuItem>
                    )} */}
                </TextField>

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
                    helperText="Please select the room where your plant lives"
                    margin="normal"
                >
                    {/* {this.props.reduxState.roomReducer.map((room, i) =>
                        <MenuItem value={room.id} key={i}>{room.name}</MenuItem>
                    )} */}
                </TextField>

                <Button variant="contained" color="default" className={classes.button} onClick={this.handleSubmit}>Add Plant </Button>
            
            </form>
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