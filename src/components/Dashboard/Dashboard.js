import React, { Component } from 'react';

import { connect } from 'react-redux';
import DashItem from '../DashItem/DashItem';

// material styles
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import needsWaterReducer from '../../redux/reducers/needsWaterReducer';

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

class Dashboard extends Component {

    percentageCalc = () => {

    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_PLANTS' })
        this.percentageCalc();
    }

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <h1>Water me!</h1>
                <Grid container spacing={24} className={classes.mainGrid} >
                    {/* maps through projects reducer and displays each project on dom*/}
                    
                    {this.props.reduxState.plantListReducer.map(plant =>

                        <DashItem plant={plant} key={plant.plant_id} />

                    )}
                   
                </Grid>
            </div>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(withStyles(styles)(Dashboard));