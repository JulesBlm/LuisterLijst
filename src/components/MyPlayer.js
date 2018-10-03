import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class MyPlayer extends Component {
    render() {
        const embedWidth = (window.innerWidth > 768) ? "500px" : 0.7*window.innerWidth;
        return (
            <ReactPlayer
                onPlay={() => this.props.handlePlay(this.props.id) }
                onPause={this.props.handlePause}
                onEnded={this.props.handleEnded}
                url={this.props.link}
                className='react-player'
                width={embedWidth}
                height='80%'
                config={
                { 
                    youtube : {
                        playerVars: { controls: 1 }
                    },
                    soundcloud : {
                        options : { show_artwork: true,
                                    sharing: false,
                                    download: false,
                                    show_comments: false,
                                    hide_related: true,
                                    visual: false
                                }
                    }
                }  }
                playsinline={true}
                playing={this.props.playing}
            />
        )
    }
}

export default MyPlayer;