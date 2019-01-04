import React, { Component } from 'react';
import { Spring } from 'react-spring';
import MyPlayer from './MyPlayer';
// import Login from './Login';
import RemoveButton from './RemoveButton';
import styled from 'styled-components';

const clamp = (n, min, max) => Math.max(Math.min(n, max), min)
const barHeight = 140;

// width: ${props => props.theme.barWidth}
const StyledBar = styled.div`
  position: absolute;
  width: var(--bar-width); 
  overflow: visible;
  transform-origin: 50% 50% 0px;
  border-radius: 4px;
  color: rgb(153, 153, 153);
  line-height: ${barHeight}px;
  padding-left: 25px;
  font-size: 18px;
  font-weight: 400;
  background-color: ${props => props.playing ? '#add8e6' : 'rgb(255, 255, 255)'};
  box-sizing: border-box;
`;

const ListDiv = styled.div`
  width: var(--bar-width);
  height: 500px;
`;

const DragPart = styled.div`
  width: 5%;
  height: 140px;
  position: inherit;
  background-color: #707070;
  color: #fff;
  right: 0;
  cursor: grab;
  border-radius: 0 4px 4px 0;

  &:hover {
    background-color: #484848;
  }

  &:focus {
    background-color: #242424;
  }

  &:active {
    cursor: grabbing;
    background-color: #242424;
  }
`;

function reinsert(arr, from, to) {
  console.group("Reinserting")
  console.log(`from ${from} to ${to}`);
  const newArray = arr.slice(0);
  const val = newArray[from];
  newArray.splice(from, 1);
  newArray.splice(to, 0, val);
  console.groupEnd();
  return newArray;
}

class List extends Component {
  state = {
    mouseY: 0, 
    topDeltaY: 0,
    isPressed: false,
    originalPosOfLastPressed: 0,
  }

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove)
    window.addEventListener('touchend', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleTouchStart = (key, pressLocation, e) => {
    // console.group("handleTouchStart")
    this.handleMouseDown(key, pressLocation, e.touches[0])
    // console.groupEnd("End of handleTouchStart");
  }
  
  handleTouchMove = e => {
    // console.group("handleTouchMove")
    e.preventDefault() || this.handleMouseMove(e.touches[0])
    // console.groupEnd("End of handleTouchMove");
  }

  handleMouseUp = () => {
    // console.group("handleMouseUp")
    this.setState({ isPressed: false, topDeltaY: 0 })
    // console.groupEnd("End of handleMouseUp");

  }

  handleMouseDown = (pos, pressY, { pageY }) => {
    // console.group("Mousedown")
      //console.log({pos})
      // console.log({pressY})
      // console.log({pageY})
    // console.groupEnd("End of mouseDown")

    this.setState({ topDeltaY: pageY - pressY,
                    mouseY: pressY,
                    isPressed: true,
                    originalPosOfLastPressed: pos })
  }

  handleMouseMove = ({ pageY }) => {
    const order = this.props.order;
    const { isPressed, topDeltaY, originalPosOfLastPressed } = this.state;

    if (isPressed) {
      const mouseY = pageY - topDeltaY;
      const currentRow = clamp(Math.round(mouseY / (barHeight+50)), 0, (order.length - 1) )
      let newOrder = order;
      // const myIndex = order.forEach(i => (i.id !== originalPosOfLastPressed) ? console.log(i) : undefined);
      // const myIndex = order.indexOf(originalPosOfLastPressed);

      // const newAttempt = findInObjectArray(order, originalPosOfLastPressed);
      // console.log(newAttempt);

      // function findID(linkObject) { 
      //   return linkObject.id === originalPosOfLastPressed;
      // }

      const myIndex = order.findIndex(linkObj => linkObj.id === originalPosOfLastPressed);

      if (currentRow !== myIndex) {
        newOrder = reinsert(order, myIndex, currentRow)
      }
      
      this.setState({ mouseY: mouseY });
      this.props.updateOrder(newOrder);
    }
  }

  render() {
    const order = this.props.order;
    const { mouseY, isPressed, originalPosOfLastPressed } = this.state
    const nowPlaying = this.props.nowPlaying;

    // // 1. Check if they are logged in
    // if (!this.props.uid) {
    //   return <Login authenticate={this.props.authenticate} />;
    // }

    return (
      <ListDiv>
        {/* {console.log("---------------------------------------")}
        {console.log("New render cycle!")}
        {console.log("---------------------------------------")} */}
        {order.map( (i, j) => {
          const active = originalPosOfLastPressed === i.id && isPressed;
          
          const style = active ?
              { scale: 1.1, shadow: 16, y: mouseY }
            : { scale: 1, shadow: 1, y: order.indexOf(i) * (barHeight + 30)};

          return (
            <Spring immediate={name => active && name === 'y'} to={style} key={i.id}>
              {({ scale, shadow, y }) => (
                <StyledBar
                  playing={nowPlaying.id === i.id}
                  style={{
                    boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    zIndex: i === originalPosOfLastPressed ? 99 : i.id
                  }}
                >

                  <DragPart
                    onMouseDown={this.handleMouseDown.bind(null, i.id, y)}
                    onTouchStart={this.handleTouchStart.bind(null, i.id, y)}                  
                  />

                  {order.indexOf(i)}
                  {/*  && this.state.paused === false */}
                  <MyPlayer 
                    link={i.link}
                    playing={(nowPlaying.id === i.id) ? true : false} 
                    handlePlay={this.props.handlePlay}
                    handlePause={this.props.handlePause}
                    handleEnded={this.props.handleEnded}
                    id={i.id}                
                  />
                  <RemoveButton onClick={() => this.props.removeLink(i.id)}>X</RemoveButton>
                </StyledBar>
              )}
            </Spring>
          )
        })}
      </ListDiv>
    )
  }
}

export default List