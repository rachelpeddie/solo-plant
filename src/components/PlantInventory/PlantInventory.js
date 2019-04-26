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

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <h4 id='plantHeader'>PLANTS</h4>
                {this.props.reduxState.plantListReducer === '' ? null : this.props.reduxState.plantListReducer.length === 0 ? <div> <h1>You need to add some plants to your family!</h1> <button className="add-plants-btn">Add Plants</button></div> :
                    <div>
                        <p id='plantCount'>plants in the fam: {this.props.reduxState.plantListReducer.length}</p>
                        <Grid container spacing={24} className={classes.mainGrid} >
                            {/* maps through projects reducer and displays each project on dom*/}
                            {this.props.reduxState.plantListReducer.map(plant =>

                                <PlantItem plant={plant} key={plant.plant_id} />

                            )}
                        </Grid>
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