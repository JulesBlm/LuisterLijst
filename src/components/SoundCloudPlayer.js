import React, { Component } from 'react';
import { PlayButton, Timer, Progress } from 'react-soundplayer/components';
import { withSoundCloudAudio } from 'react-soundplayer/addons';

const clientId = '2t9loNQH90kzJcsFCODdigxfp325aq4z';

const scDispatchArray = [];

class SoundCloudPlayer extends Component {

  componentDidMount() {
    let { soundCloudAudio } = this.props;
    const id = this.props.nr;
    scDispatchArray[id] = soundCloudAudio._events.pause;
    console.log(soundCloudAudio, soundCloudAudio._events.pause(), soundCloudAudio._events.ended())

    this.props.addSCDispatchers(scDispatchArray);
  }

  // addDispatch = (id) => (e) => {
  //   console.log("adding sc dispatcher", id, e);
  //   // scDispatchArray[id] = (e.target);
  //   this.props.addSCDispatchers(scDispatchArray);
  // }

  render() {
    let { track, currentTime, duration } = this.props;

    return (
      <span className="soundcloud-player" key={this.props.nr}>
        <PlayButton
          className="play"
          onPlayClick={this.handlePlayPause}
          {...this.props} />
        {track ? track.user.username : ''}
        {track ? track.title : 'Loading...'}
        <Progress
          className="sc-progress-container"
          innerClassName="sc-progress-inner"
          value={(currentTime / duration) * 100 || 0}
          {...this.props}
        />
      </span>
    )
  }
}

export default withSoundCloudAudio(SoundCloudPlayer);

/*
        <Timer 
          className="custom-player-timer"
          duration={track ? track.duration / 1000 : 0} 
          currentTime={currentTime} 
          {...props} />*/