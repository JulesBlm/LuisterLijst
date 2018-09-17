import React, { Component } from 'react'
import YouTube from 'react-youtube';
// Make a youtube/soundclou/mixcloud player switch depending on linktype
// Create dispatch Context

const dispatchArray = [];

class YouTubePlayer extends Component {

    addDispatch = (id) => (e) => { 
        dispatchArray[id] = (e.target);
        this.props.addDispatchers(dispatchArray);
    }

    handlePlay = (id) => (e) => {
        console.log("YouTube PLAY button pushed")
        this.props.playYoutube(id, "youtube");
    }

    handlePause = (event) => {
        console.log("YouTube PAUSE button pushed")
        this.props.onlyChangePaused();
    }
    
    handleEnd = (event) => {
        console.log("YouTube vid Ended");
        this.props.nextControl();
    } 

    render() {
        const opts = {
            height: '50',
            width: '400',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                modestbranding: 1,
                fs: 0
            }
          };

        return (
            <YouTube
                videoId={this.props.youtubeid}
                opts={opts}
                onReady={this.addDispatch(this.props.nr)}
                onPlay={this.handlePlay(this.props.nr)}
                onPause={this.handlePause}
                onEnd={this.handleEnd}
            />
        )
    }
}

export default YouTubePlayer;