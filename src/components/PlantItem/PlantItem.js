import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaSun } from 'react-icons/fa';

// material styles
import Grid from '@material-ui/core/Grid';

//require moment
const moment = require('moment');

class PlantItem extends Component {


    waterCalc = (plant) => {
        console.log(`water is`, plant);
        
        const now = moment().format();
        const expiration = moment(plant.last_watered);

        // get the difference between the moments
        const diff = expiration.diff(now);
        console.log(diff);

        //express as a duration
        const diffDuration = moment.duration(diff);
        if (diffDuration.days() >= plant.days_to_water) {
            console.log(`${plant.nickname} needs some water!`);
            // this.waterStatus(plant);
        }
        else {
            console.log(`Relax! ${plant.nickname} is healthy.`);

        }
        let days = (diffDuration.days() + plant.days_to_water)

        // display
        console.log("Days:", days);
        return Math.abs(days);
    }

    familyCalc = (added) => {

        const now = moment().format();
        const expiration = moment(added);

        // get the difference between the moments
        const diff = expiration.diff(now);
        console.log(diff);

        const diffDuration = moment.duration(diff);
        let days = diffDuration.days()-1;
        return Math.abs(days);
    }

    handleDelete = (plant) => {
        console.log(`this will delete a plant`, plant.plant_id);
        this.props.dispatch({ type: 'DELETE_PLANT', payload: plant.plant_id})
    }

    render(){
        return (
            <Grid item xs={4}>
                <div>
                    <img src={this.props.plant.image} alt={this.props.plant.type} className='galleryImage' />
                    <h2 className='plant-header'>{this.props.plant.nickname}</h2>
                    <h3 className='plant-subheader'>{this.props.plant.plant_type}</h3>
                    {this.props.plant.status === true ?
                        <p className='plant-info'>Water me in {this.waterCalc(this.props.plant)} days</p> :
                        <p className='plant-info'>Help me!  I need water!</p>
                    }
                    <p className='plant-info'>{this.familyCalc(this.props.plant.date_added)} days in the fam</p>
                    <p className='plant-info'><FaSun /><span className='light-spacing'>{this.props.plant.sunlight}</span></p>
                    <button onClick={() => this.handleDelete(this.props.plant)} className='remove-button'>Remove</button>
                </div>
            </Grid>
        )
    }
}

export default connect()(PlantItem);