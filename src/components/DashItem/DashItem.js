import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaTint } from 'react-icons/fa';

// material styles
import Grid from '@material-ui/core/Grid';

const moment = require('moment');
class DashItem extends Component {

    // function to dispatch plant to change water status when days left to water = 0
    waterStatus = (plant) => {
        console.log(`this will change water status for`, plant.nickname);
        this.props.dispatch({ type: 'UPDATE_STATUS', payload: plant });
    }

    needsWaterCalc = (plant) => {
        // console.log(`water is`, plant);

        const now = moment().format();
        const expiration = moment(plant.last_watered);

        // get the difference between the moments
        const diff = expiration.diff(now);

        //express as a duration
        const diffDuration = moment.duration(diff);
        console.log(diffDuration.days());
        

        let days = (diffDuration.days() + plant.days_to_water)

        console.log(`${plant.nickname}'s days are`, days);
        
        if (days <= 0 && plant.status === true) {
            console.log(`${plant.nickname} needs some water!`);
            this.waterStatus(plant);
        }
        else {
            console.log(`Relax! ${plant.nickname} is healthy.`);
        }
        return Math.abs(days);
    }
    
    componentDidMount = () => {
        this.needsWaterCalc(this.props.plant);
    }

    checkStatus = (plant) => {
        // console.log(`plants are`, plant);
        
        if(plant.status === false) {
            return(
            <Grid item>
                <div className='dashDiv'>
                    <img src={plant.image} alt={plant.plant_type} className='galleryImage' />
                    <h2 className='plant-header'>{plant.nickname}</h2>
                        <p className='room'>{plant.plant_type} | {plant.room}</p>
                    {/* <h4 className = 'room'>{plant.room}</h4> */}
                        <button className='dashButton' onClick={() => this.waterPlant(this.props.plant)}> <FaTint className='vertical-align'/> Water me!</button>
                </div>
            </Grid>
            )}
        else {
         return null;
        }
    }

    waterPlant = (plant) => {
        console.log(`this will change water status for`, plant.nickname);
        this.props.dispatch({ type: 'WATER_PLANT', payload: plant });
    }

    render() {
        return (
            <div>
                {this.checkStatus(this.props.plant)}
            </div>
        )
    }
}

export default connect()(DashItem);