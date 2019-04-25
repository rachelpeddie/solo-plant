import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {
    render(){
        return(
            <div id='about-div'>
                <h1>Welcome to PlantIt!</h1>
                <p>Our mission is to help humans everywhere keep their plants alive and healthy by sending you a reminder to water your plants when they need it. If you (like most humans) need a reminder to keep your plants alive, join us!</p>
                <center>
                    <button
                        type="button"
                        className="link-button"
                        onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
                    >
                        Register
                    </button>
                </center>
            </div>
        )
    }
}
export default connect()(About);