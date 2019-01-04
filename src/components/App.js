/*
! Make only right part of bar draggable
- Play controls and play mechanism
- Detect when no connection
- on resize change embed widths
---------------- Later ----------------
? proptypes or typescript
? show added date [later]

--------BUGS -----------
! When moving nowplaying bug
-when dragging mouse on iframe should not hijack mouse mode

-- NOWPLAYING STATE DOENS'T CHANGE --
- When one playing bar moved to top, and one is started below, color doesn't change
- Same situation, when bar below is played, playing above doesn't pause
--- BECAUSE on events arent triggered anymore by react player

- myPlayer keeps running when moved up, but not when moved down

- On mobile: Make bar wider
  - Move 'clear button', not absolute position
  - Dragging is slow, turn of Myplayer if is being dragged
*/
import React, { Component } from 'react';
import List from './List';
import AddLinkForm from './AddLinkForm';
import Controls from './Controls';
import StyledClear from './StyledClear';
import swal from 'sweetalert';
import styled from 'styled-components';

// const IntroBubble = styled.div`
//   background-color: white;
//   color:black;
//   position: absolute;
//   top: 20px;
//   left: 50px;
//   width: 200px;
//   padding: 30px;
//   font-size:0.5em;
//   border-radius: 10px;
// `

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
    order: [
      {id: 0, link: "https://www.youtube.com/watch?v=6saB1L3a6Cs"},
      {id: 1, link: "https://soundcloud.com/rinsefm/visiblecloaks010918"},
      {id: 2, link: "https://mixcloud.com/DummyMag/dummy-mix-472-orla/"},
      {id: 3, link: "https://www.youtube.com/watch?v=A1bjDjfnThA"}
    ],
    uid: null,
    owner: null
  }

  componentDidMount() {
    const localStorageOrder = localStorage.getItem("order");
    if (localStorageOrder) {
      // console.log("Retrieving from localStorage!")
      this.setState({ order: JSON.parse(localStorageOrder) });
    }

  }

  componentDidUpdate() {
    // console.log("updated so add to localstorage");
    localStorage.setItem("order", JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
  }


  clearLocalStorage = () => {
    localStorage.clear();
    swal("Cleared storage", "Maybe reload the page as well", "warning");
  }

  changeNowPlayingByIndex = (index) => {
    console.warn("Changing nowplaying by index")
    const order = [...this.state.order];
    const nowPlaying = {
      index: index,
      id: order[index].id,
    }
    this.setState({ nowPlaying })
  }

  changeNowPlayingById = (i) => {
    // ERROR in HERE
    console.warn("Changing nowplaying by id");
    const order = [...this.state.order];
    const updatedIndex = order.findIndex(linkObj => linkObj.id === i);
    console.log({updatedIndex});
    const nowPlaying = {
      index: updatedIndex,
      id: i,
    } 

    this.setState((prevState) => {
      return { nowPlaying }
    });
    // this.setState({ nowPlaying })
  }

  playControl = () => {
    console.group("Pressed play control button")
    if (this.state.paused) {
      this.setState({paused: false});
      console.log("Play the previously paused video");
    } else if (this.state.nowPlaying.id === null) {
      console.log("Nothing was started yet, play first one");
      this.changeNowPlayingByIndex(0);
    }
    console.groupEnd()
  }

  previousControl = () => {
    console.log("Previous!");
    const nowPlaying = {...this.state.nowPlaying};

    if (nowPlaying.index !== 0) {
      nowPlaying.index -= 1;
      this.changeNowPlayingByIndex(nowPlaying.index);
    } else {
      swal("This is the first one in the list", "So you go to the previous", "warning");
    }
  }

  //One function that checks whether youtube or soundcloud is playing now
  nextControl = () => {
    console.group("Next control")
    let nowPlaying = this.state.nowPlaying;

    if (nowPlaying.index !== this.state.order.length) {
      console.log("pause one currently playing and go to next");
      nowPlaying.index += 1;
    } else {
      swal("This is the last one in the list", "Add more to continue or start over", "warning");
    }
    this.changeNowPlayingByIndex(nowPlaying.index);

    console.groupEnd()
  }

  handlePlay = (i) => {
    console.group("Play triggered, with id:", i)
    const nowPlaying = {...this.state.nowPlaying};
    // Pause if other track is playing
    if (nowPlaying.id !== i && nowPlaying.id !== null) {
      console.log("Another track was playig, pause it first")
      this.handlePause();
    }
  
    this.changeNowPlayingById(i);
    
    this.setState({ paused: false });
    // this.setState((prevState) => {
    //   return { paused: false }
    // });
  
    console.groupEnd()
  }

  handlePause = () => {
    console.group("Pressed pause control");
    this.setState({ paused: true });
    console.groupEnd()
  }

  handleEnded = () => {
    console.group("Ended go to next!")
    let nowPlaying = this.state.nowPlaying;

    if (nowPlaying.index + 1 !== this.state.order.length) {
      nowPlaying.index += 1;
      this.changeNowPlayingByIndex(nowPlaying.index);    
    } else {
      nowPlaying.index = null;
      nowPlaying.id = null;
      this.setState({ paused: null, nowPlaying });
      swal("Last one", "Done playing, none left", "warning");
    }
    console.groupEnd();
  }
  
  removeLink = (id) => {
    console.warn("Removing", id)
    const order = [...this.state.order];
    const myIndex = order.findIndex(linkObj => linkObj.id === id);
    order.splice(myIndex, 1); // Remove from order
    //every id higher than removed id should be decremented by 1?
    this.setState({ order }); //links
  };

  addLink = (newlink) => {
    if (newlink.includes("youtu") || newlink.includes("soundcloud") || newlink.includes("mixcloud") ) {
      const order = [...this.state.order]
      order.push({link: newlink, id: order.length });
      this.setState({ order });
    } else {
      swal("Not a valid newlink!", "This doesn't look like a valid SoundCloud, MixCloud or YouTube newlink", "warning");
    }
  };

  // Update nowPlaying state when reordered
  updateOrder = (newOrder) => {
    console.log("Updating order");
    // console.log({newOrder});
    this.setState({ order: newOrder });
    const nowPlaying = {...this.state.nowPlaying};
    if (nowPlaying.index !== null) this.changeNowPlayingById(nowPlaying.id);
  };

  render() {
    return (
    <main>
      <StyledClear onClick={this.clearLocalStorage}>Click if things aren't working anymore</StyledClear>
      <PageTitle>Luisterlijst</PageTitle>
      {/* <IntroBubble>One unified queue for YouTube, SoundCloud and MixCloud. When one track is done the next one will start playing automatically, regardless of its type! This page will remember what track you entered, you'll keep your tracks next time you visit. Start by entering some YouTube, Sound- or Mixcloud links! Drag a bar by the dark part on the right to reorder the list.</IntroBubble> */}
      <Controls 
        previousControl={this.previousControl}
        playControl={this.playControl}
        pauseControl={this.handlePause}
        nextControl={this.nextControl}

        paused={this.state.paused}
      />
      <AddLinkForm
        addLink={this.addLink}
      />
      <List
        nowPlaying={this.state.nowPlaying}
        uid={this.state.uid}
        owner={this.state.owner}
        authenticate={this.authenticate}

        removeLink={this.removeLink}
        updateOrder={this.updateOrder}
        
        handlePlay={this.handlePlay}
        handlePause={this.handlePause}
        handleEnded={this.handleEnded}

        paused={this.state.paused}

        order={this.state.order}
      />
      {/* {this.state.uid && <button onClick={this.logout}>Log Out!</button>} */}
    </main> 
    )
  }
}

export default App