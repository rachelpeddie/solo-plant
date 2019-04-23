import React, { Component } from 'react';
import { connect } from 'react-redux';


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
        if (diffDuration.days() >= plant.days_to_water-1) {
            console.log(`${plant.nickname} needs some water!`);
            // this.waterStatus(plant);
        }
        else {
            console.log(`Relax! ${plant.nickname} is healthy.`);

        }
        let days = (diffDuration.days() + plant.days_to_water-1)

        // display
        console.log("Days:", days);
        return days;
    }


    waterStatus = (plant) => {
        console.log(`this will change water status for`, plant.nickname);
        this.props.dispatch({ type: 'UPDATE_STATUS', payload: plant })
    }

    familyCalc = (added) => {

        const now = moment().format();
        const expiration = moment(added);

        // get the difference between the moments
        const diff = expiration.diff(now);
        console.log(diff);

        const diffDuration = moment.duration(diff);
        let days = diffDuration.days() + 1;
        return days;
    }

    handleDelete = () => {
        console.log(`this will eventually delete a plant`);
        // this.props.dispatch({ type: 'DELETE_PLANT' })
    }

    render(){
        return (
            <Grid item xs={4}>
                <div>
                    <img src={this.props.plant.image} alt={this.props.plant.type} className='galleryImage' />
                    <h2>{this.props.plant.nickname}</h2>
                    <h3>{this.props.plant.plant_type}</h3>
                    {this.props.plant.status === true ?
                        <p>Water me in {this.waterCalc(this.props.plant)} days</p> :
                        <button onClick={ () => this.waterStatus(this.props.plant)}>water me!</button>
                    }
                    <p>{this.familyCalc(this.props.plant.date_added)} days in the fam</p>
                    <p>{this.props.plant.sunlight}</p>
                    <button onClick={() => this.handleDelete}>Delete</button>
                </div>
            </Grid>
        )
    }
}

export default connect()(PlantItem);