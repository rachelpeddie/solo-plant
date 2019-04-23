import React, { Component } from 'react';
import { connect } from 'react-redux';

// material styles
import Grid from '@material-ui/core/Grid';


class PlantItem extends Component {


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
                        <p>I'm watered!</p> :
                        <p>I need food <button>water me!</button></p>
                    }
                    <p>{this.props.plant.sunlight}</p>
                    <button onClick={this.handleDelete}>Delete</button>
                </div>
            </Grid>
        )
    }
}

export default connect()(PlantItem);