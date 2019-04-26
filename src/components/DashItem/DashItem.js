import React, { Component } from 'react';
import { connect } from 'react-redux';


// material styles
import Grid from '@material-ui/core/Grid';
class DashItem extends Component {
    checkStatus = (plant) => {
        // console.log(`plants are`, plant);
        
        if(plant.status === false) {
            return(
            <Grid item xs={4}>
                <div className='dashDiv'>
                    <img src={plant.image} alt={plant.plant_type} className='smallImage' />
                    <h2 className='plant-header'>{plant.nickname}</h2>
                        <p className='room'>{plant.plant_type} | {plant.room}</p>
                    {/* <h4 className = 'room'>{plant.room}</h4> */}
                    <button className='dashButton' onClick={() => this.waterPlant(this.props.plant)}>I've been watered!</button>
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