import React, { Component } from 'react';
import { connect } from 'react-redux';

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

    handleDelete = () => {
        console.log(`this will eventually delete a plant`);
        // this.props.dispatch({ type: 'DELETE_PLANT' })
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={24} className={classes.mainGrid} >
                    {/* maps through projects reducer and displays each project on dom*/}
                    {this.props.reduxState.plantListReducer.map(plant =>

                        <Grid item xs={4} key={plant.id}>
                            <div>
                                <img src={plant.image} alt={plant.type}/>
                                <h2>{plant.nickname}</h2>
                                <h3>{plant.type}</h3>
                                <p>{plant.name}</p>
                                <p>{plant.status}</p>
                                <p>{plant.light}</p>
                                <button onClick={this.handleDelete}>Delete</button>
                            </div>
                        </Grid>
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