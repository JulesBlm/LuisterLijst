import React, { Component } from 'react'
import '../MixCloudWidgetApi.js';

class Player extends Component {


    handlePlay = (id) => (e) => {
        console.log("Mixcloud PLAY button pushed")
    }

    handlePause = (event) => {
    }
    
    handleEnd = (event) => {
        console.log("Mixcloud Ended");
    } 

    render() {

        return (
            <iframe >
                {
                var widget = Mixcloud.PlayerWidget(myIframe);
                widget.events.pause.on(pauseListener);

                }

            </iframe>
        )
    }
}

export default Player;