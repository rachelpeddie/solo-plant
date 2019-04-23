import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlantItem from '../PlantItem/PlantItem';

// material styles
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    mainGrid: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class PlantInventory extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_PLANTS' })
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={24} className={classes.mainGrid} >
                    {/* maps through projects reducer and displays each project on dom*/}
                    {this.props.reduxState.plantListReducer.map(plant =>

                        <PlantItem plant={plant} key={plant.plant_id}/>

                    )}
                </Grid>
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