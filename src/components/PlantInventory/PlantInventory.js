import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlantItem from '../PlantItem/PlantItem';

// material styles
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    mainGrid: {
        // padding: theme.spacing.unit * 2,
        textAlign: 'center',
        
    },
    textField: {
        width: 200,
    },
    cssLabel: {
        '&$cssFocused': {
            color: '#9db1b1;',
        },
    },
    cssFocused: {},
    cssUnderline: {
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

const sortList = [{ id: 1, name: 'Room', type: 'room_id' }, { id: 2, name: 'Light Requirement', type: 'sun_id' }, { id: 3, name: 'Water Status', type: 'status'  }];

class PlantInventory extends Component {

    state = {
        sort_by: '',
        plants: []
    }

    sortBy = (sortby) => {
        console.log(`sortby is`, sortby);
        
        this.setState({ plants: this.props.reduxState.plantListReducer.sort((a, b) => a[sortby] - b[sortby]) });
        console.log(`this.state.plants is`, this.state.plants);
        
    }
    
    handleChangeFor =  value => event  => {
       
        console.log(`event target value`, event.target.value);
        this.sortBy(event.target.value.type);
        this.setState({
            sort_by: event.target.value
        })
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_PLANTS' })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <h4 id='plantHeader'>PLANTS</h4>
                {this.props.reduxState.plantListReducer === '' ? null : this.props.reduxState.plantListReducer.length === 0 ? <div> <h1>You need to add some plants to your family!</h1> <button className="add-plants-btn">Add Plants</button></div> :
                    <div>
                        <div>
                            <center>
                            <TextField
                                id="standard-select"
                                select
                                label="Sort by"
                                className={classes.textField}
                                value={this.state.sort_by}
                                onChange={this.handleChangeFor('sort_by')}
                                // SelectProps={{
                                //     MenuProps: {
                                //         className: classes.menu,
                                //     },
                                // }}
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
                            >
                                {sortList.map((item, i) =>
                                    <MenuItem value={item} key={i}>{item.name}</MenuItem>
                                )}
                            </TextField>
                            </center>
                        </div>
                        
                        <p id='plantCount'>plants in the fam: {this.props.reduxState.plantListReducer.length}</p>
                     <div className='center-div'>
                        <div className={classes.mainGrid}>
                                <Grid container justify="center">
                            {/* maps through projects reducer and displays each project on dom*/}
                            {this.state.sort_by === '' ? this.props.reduxState.plantListReducer.map(plant =>

                                <PlantItem plant={plant} key={plant.plant_id} />

                            ) : this.state.plants.map(plant => 
                                <PlantItem plant={plant} key={plant.plant_id} />)}
                        </Grid>
                    </div>
                    
                    </div>
                    </div>

                }
            </div>

        )
    }
}

PlantInventory.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(withStyles(styles)(PlantInventory));