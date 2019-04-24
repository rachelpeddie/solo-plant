import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { connect } from 'react-redux';
import DashItem from '../DashItem/DashItem';

//progress bar styles
import 'react-circular-progressbar/dist/styles.css';
import './custom.css';

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

class Dashboard extends Component {


    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_PLANTS' })
    }

    percentageCalc = () => {
        let needsWater = [];
        let plantList = this.props.reduxState.plantListReducer
        console.log(`plantList variable`, plantList.length);
        
        
        plantList.map( plant => {
            if (plant.status === false){
                needsWater.push(plant)
            }
        })
        console.log(`needs water`, needsWater.length);
        let watered = plantList.length - needsWater.length
        let percent = (watered / plantList.length) * 100 ;
        console.log(`watered is`, percent);
        
        return Math.round(percent);
    }


    render(){
        const { classes } = this.props;
        return (
            <div>
                <CircularProgressbar
                    percentage={this.percentageCalc()}
                    text={`${this.percentageCalc()}%`}
                    styles={{
                        // Customize the root svg element
                        root: {
                            height: `20vh`
                        },
                        // Customize the path, i.e. the "completed progress"
                        path: {
                            // Path color
                            stroke: `rgba(62, 152, 199, ${this.percentageCalc() / 100})`,
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'butt',
                            // Customize transition animation
                            transition: 'stroke-dashoffset 0.6s ease 0s',
                        },
                        // Customize the circle behind the path, i.e. the "total progress"
                        trail: {
                            // Trail color
                            stroke: '#d6d6d6',
                        },
                        // Customize the text
                        text: {
                            // Text color
                            fill: '#f88',
                            // Text size
                            fontSize: '24px',
                        },
                        // Customize background - only used when the `background` prop is true
                        background: {
                            fill: '#3e98c7',
                        },
                    }}
                />
            
            <div className={classes.root}>
                
                <h1>Water me!</h1>
                <Grid container spacing={24} className={classes.mainGrid} >
                    {/* maps through projects reducer and displays each project on dom*/}
                    
                    {this.props.reduxState.plantListReducer.map( plant =>

                        <DashItem plant={plant} key={plant.plant_id} />

                    )}
                   
                </Grid>
            </div>
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