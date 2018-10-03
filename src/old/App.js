/*
- switch to react-player for soundcloud
!!SoundCloud Controllers!
! Make only right part of bar draggable
- Think real hard about decent naming and code structure
? Refactor order/links list [React Context]
- Play controls and play mechanism
- Detect when no connection
- on end pause is null
---------------- Later ----------------
- Add mixcloud
? proptypes or typescript
? show added date [later]
*/

import React, { Component } from 'react';
import List from './List';
import AddLinkForm from './AddLinkForm';
import Controls from './Controls';
import swal from 'sweetalert';
import YouTubeVideoId from 'youtube-video-id';
import styled from 'styled-components';

const PageTitle = styled.h1`
  text-shadow: 1px 0px 2px black; 
  margin: 40px;
`;

class App extends Component {
  state = {
    nowPlaying: {
      index: null,
      id: null,
    },
    paused: false,
    order: [ 0, 1, 2, 3 ],
    links: [
      {youtube: "6saB1L3a6Cs"},
      {soundcloud: "https://soundcloud.com/rinsefm/visiblecloaks010918"},
      {youtube: "A1bjDjfnThA"},
      {youtube: "uJhddZYqUmc"},
    ],
    dispatchers: null,
    scDispatchers: null,
  }

  componentDidMount() {
    const localStorageOrder = localStorage.getItem("order");
    const localStorageLinks = localStorage.getItem("links");
    if (localStorageLinks) {
      // console.log("Retrieving from localStorage!")
      this.setState({ links: JSON.parse(localStorageLinks) });
      this.setState({ order: JSON.parse(localStorageOrder) });
    }
  }

  componentDidUpdate() {
    // console.log("updated so add to localstorage");
    localStorage.setItem("order", JSON.stringify(this.state.order));
    localStorage.setItem("links", JSON.stringify(this.state.links));
  }

  addDispatchers = (dispatchers) => {
    this.setState({ dispatchers });
  }

  addSCDispatchers = (scDispatchers) => {
    this.setState({ scDispatchers });
  }

  changeNowPlayingByIndex = (index) => {
    const order = [...this.state.order];
    const nowPlaying = {
      index: index,
      id: order[index],
    }
    this.setState({ nowPlaying })
  }

  changeNowPlayingById = (i) => {
    const order = [...this.state.order];
    const nowPlaying = {
      index: order.indexOf(i),
      id: i,
    }      
    this.setState({ nowPlaying })
  }

  onlyChangePausedState = () => {
    this.setState({ paused: true });
  }

  // Starts or pauses a youtube bar
  dispatchPlayOrPause = (playstring) => {
    const dispatchers = [...this.state.dispatchers];
    const nowPlaying = this.state.nowPlaying
    const currentDispatcher = dispatchers[nowPlaying.id];

    console.log("Nowplaying id", nowPlaying.id, "with index", nowPlaying.index);

    switch (playstring) {
      case "pause":
        console.log("DISPATCH PAUSE")
        currentDispatcher.pauseVideo();
        break;
      case "play":
        console.log("DISPATCH PLAY")
        currentDispatcher.playVideo();
    }
  }

  playControl = () => {
    console.group("Pressed play control button")
    if (this.state.paused) {
      console.log("Play the previously paused video");
      this.dispatchPlayOrPause("play");
    } else if (this.state.nowPlaying.id === null) {
      console.log("Nothing was started yet, play first one AGAIN CHECK WETHER IT IS YT OR SC");
      this.changeNowPlayingByIndex(0);
      this.dispatchPlayOrPause("play");
    }
    console.groupEnd()
  }

  previousControl = () => {
    console.log("Previous!");
    const nowPlaying = {...this.state.nowPlaying};
    // const order = [...this.state.order];

    if (nowPlaying.index !== 0) {
      this.dispatchPlayOrPause("pause");
      nowPlaying.index -= 1;
      this.changeNowPlayingByIndex(nowPlaying.index);
      this.dispatchPlayOrPause("play");  
    } else {
      console.log("Nope, this is the FIRST one cant go back");
    }
  }

  pauseControl = () => {
    console.group("Pressed pause control button");
    const links = [...this.state.links];
    const nowPlaying = {...this.state.nowPlaying};

    if (links[nowPlaying.id].youtube) {
      this.pauseYoutube();
    } else if (links[nowPlaying.id].soundcloud) {
      console.log("Pause the current SoundCloud track")
      // this.pauseSoundCloud()
    }

    console.groupEnd();
  }

  //One function that checks whether youtube or soundcloud is playing now
  nextControl = () => {
    console.group("Next control")
    let nowPlaying = this.state.nowPlaying;
    const links = [...this.state.links];

    if (nowPlaying.index !== this.state.links.length) {
      if (links[nowPlaying.index].youtube) {
        console.log("Pausing the youtube playing playing now")
        this.dispatchPlayOrPause("pause");
        this.nextYoutube()
      } else {
        // this.nextSoundcloud()
        console.log("Now it should pause the damn soundcloud track thats up next")
      }
    } else {
      swal("This is the last one in the list", "Add more to continue or start over", "warning");
    }
    this.changeNowPlayingByIndex(nowPlaying.index);
    // this.dispatchPlayOrPause("play"); //This dispatch triggers this.playYoutube 

    console.groupEnd()
  }

  playYoutube = (i) => {
    console.group("Soundcloud play triggered")
    const nowPlaying = {...this.state.nowPlaying};
    
    if ( (nowPlaying.id !== i) && (nowPlaying.id !== null) ) { // ||
      console.log("A different Youtube play was pressed than what is playing now!!!");
      this.dispatchPlayOrPause("pause");
    }
    this.changeNowPlayingById(i);
    this.dispatchPlayOrPause("play");
    console.groupEnd()
  }

  playYoutube = (i) => {
    console.group("Youtube play triggered")
    const nowPlaying = {...this.state.nowPlaying};
    
    if ( (nowPlaying.id !== i) && (nowPlaying.id !== null) ) { // ||
      console.log("A different Youtube play was pressed than what is playing now!!!");
      this.dispatchPlayOrPause("pause");
    }
    this.changeNowPlayingById(i);
    this.dispatchPlayOrPause("play");
    console.groupEnd()
  }

  pauseYoutube = () => {
    console.group("Pressed a youtube pause button");
    this.setState({ paused: true, playing: false });
    this.dispatchPlayOrPause("pause");
    console.groupEnd()
  }

  nextYoutube = () => {
    console.group("Youtube video ended go to next!")
    let nowPlayingIndex = this.state.nowPlaying.index;
    nowPlayingIndex += 1;
    this.changeNowPlayingByIndex(nowPlayingIndex);
    this.dispatchPlayOrPause("play");
    console.groupEnd();
  }

  nextSoundcloud = () => {
    console.group("Go to next soundcloud!")
    let nowPlayingIndex = this.state.nowPlaying.index;
    nowPlayingIndex += 1;
    this.changeNowPlayingByIndex(nowPlayingIndex);
    // this.playNextSC("play");
    console.groupEnd();
  }
  
  removeLink = (nr) => {
    const order = [...this.state.order];
    const myIndex = order.indexOf(nr);
    order.splice(myIndex, 1);

    const links = [...this.state.links];
    links.splice(nr, 1);
    this.setState({ order, links });
  };

  addLink = (link) => {
    if (link.includes("youtu") || link.includes("soundcloud") || link.includes("mixcloud") ) {
      const links = [...this.state.links];
      const order = [...this.state.order]

      if (link.includes("youtu")) {
        const youTubeId = YouTubeVideoId(link);
        links.push({youtube: youTubeId});
      } else if (link.includes("soundcloud")) {
        console.log("Soundcloud link entered")
        links.push({soundcloud: link});
      }
      //If mixcloud

      order.push(order.length);
      this.setState({ links, order });
    } else {
      swal("Not a valid link!", "This doesn't look like a valid SoundCloud, MixCloud or YouTube link", "warning");
    }
  };

  // Update nowPlaying state when reordered
  updateOrder = (newOrder) => {
    this.setState({ order: newOrder });
    const nowPlaying = {...this.state.nowPlaying};
    if (nowPlaying.index !== null) {
      this.changeNowPlayingById(nowPlaying.id);
    }
  };

  render() {    
    return (
    <main>
      <PageTitle>Luisterlijst</PageTitle>
      <Controls 
        previousControl={this.previousControl}
        playControl={this.playControl}
        pauseControl={this.pauseControl}
        nextControl={this.nextControl}

        paused={this.state.paused}
      />
      <AddLinkForm
        addLink={this.addLink}
      />
      <List
        removeLink={this.removeLink}
        updateOrder={this.updateOrder}

        addSCDispatchers={this.addSCDispatchers}
        playSoundcloud={this.playSoundcloud}
        
        nextControl={this.nextControl}

        addDispatchers={this.addDispatchers}
        playYoutube={this.playYoutube}

        onlyChangePaused={this.onlyChangePausedState}

        order={this.state.order}
        links={this.state.links}
      />

    </main> 
    )
  }
}

export default App

/* Don't think passing nowPlayingId to controls is necessary */