import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {

    goToRegister = () => {
        this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' });
        this.props.history.push('/');
    }
    render(){
        
        return(
            <div id='about-div'>
                <h1>Welcome to PlantIt!</h1>
                <p>Our mission is to help humans everywhere keep their plants alive and healthy by sending you a reminder to water your plants when they need it. If you (like most humans) need a reminder to keep your plants alive, join us!</p>
                {this.props.reduxState.user.id === undefined ? <center>
                    <button
                        type="button"
                        className="link-button"
                        onClick={this.goToRegister}
                    >
                        Register
                    </button>
                </center> : null
                
                }
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(About);