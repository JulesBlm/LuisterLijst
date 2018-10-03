// Forked from: https://github.com/chenglou/react-motion/tree/master/demos/demo8-draggable-list
// Original: http://framerjs.com/examples/preview/#list-sorting.framer

import React, { Component } from 'react';
import { Spring } from 'react-spring';
import range from 'lodash/range';
import YouTubePlayer from './YouTubePlayer';
import SoundCloudPlayer from './SoundCloudPlayer';
import styled from 'styled-components';

const clamp = (n, min, max) => Math.max(Math.min(n, max), min)
const barHeight = 140;


const StyledBar = styled.div`
  position: absolute;
  width: var(--bar-width);
  overflow: visible;
  pointer-events: auto;
  transform-origin: 50% 50% 0px;
  border-radius: 4px;
  color: rgb(153, 153, 153);
  line-height: ${barHeight}px;
  padding-left: 30px;
  font-size: 18px;
  font-weight: 400;
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
`;

const RemoveButton = styled.button`
  position: fixed;
  top: -10px;
  right: -10px;
  padding: 6px 9px;
  border-radius: 25px;
  background-color: crimson;
  color:white;
  transition: 0.1s cubic-bezier(0.175,0.885,0.320,1.275);

  &:hover {
    transform: scale(1.1);
    background-color: coral;
  }
`;

const ListDiv = styled.div`
  width: var(--bar-width);
  height: 500px;
`;

function reinsert(arr, from, to) {
  const _arr = arr.slice(0)
  const val = _arr[from]
  _arr.splice(from, 1)
  _arr.splice(to, 0, val)
  return _arr
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

  handleTouchStart = (key, pressLocation, e) => this.handleMouseDown(key, pressLocation, e.touches[0])
  
  handleTouchMove = e => e.preventDefault() || this.handleMouseMove(e.touches[0])

  handleMouseUp = () => this.setState({ isPressed: false, topDeltaY: 0 })

  handleMouseDown = (pos, pressY, { pageY }) => {
    // console.group("Mousedown")
      // console.log({pos})
      // console.log({pressY})
      // console.log({pageY})
    // console.groupEnd()

    this.setState({ topDeltaY: pageY - pressY, mouseY: pressY, isPressed: true, originalPosOfLastPressed: pos })
  }

  handleMouseMove = ({ pageY }) => {
    const order = this.props.order;
    const { isPressed, topDeltaY, originalPosOfLastPressed } = this.state

    if (isPressed) {
      const mouseY = pageY - topDeltaY
      const currentRow = clamp(Math.round(mouseY / (barHeight+30)), 0, (order.length - 1) )
      let newOrder = order
      const myIndex = order.indexOf(originalPosOfLastPressed);

      // Find the index in array: order of nr: originalPosOfLastPressed
      if (currentRow !== myIndex) {
        newOrder = reinsert(order, myIndex, currentRow)
      }
      
      this.props.updateOrder(newOrder)
      this.setState({ mouseY: mouseY })
    }
  }

  render() {
    const order = this.props.order;
    const { mouseY, isPressed, originalPosOfLastPressed } = this.state
    return (
      <ListDiv>
      
        {range(order.length).map( (i) => {
          const active = originalPosOfLastPressed === i && isPressed;
          
          const style = active
            ? { scale: 1.1, shadow: 16, y: mouseY }
            : { scale: 1, shadow: 1, y: order.indexOf(i) * (barHeight + 30) }

          return (
            <Spring immediate={name => active && name === 'y'} to={style} key={i}>
              {({ scale, shadow, y }) => (
                <StyledBar
                  onMouseDown={this.handleMouseDown.bind(null, i, y)}
                  onTouchStart={this.handleTouchStart.bind(null, i, y)}
                  style={{
                    boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    zIndex: i === originalPosOfLastPressed ? 99 : i
                  }}>
                  {order.indexOf(i) + 1} :
  
                  {this.props.links[i].youtube && 
                    <YouTubePlayer
                      addDispatchers={this.props.addDispatchers}
                      onlyChangePaused={this.props.onlyChangePaused}

                      playYoutube={this.props.playYoutube}
                      nextControl={this.props.nextControl}

                      nr={i}
                      youtubeid={this.props.links[i].youtube}
                    />}
  
                  {this.props.links[i].soundcloud &&
                    <SoundCloudPlayer
                      clientId={"95f22ed54a5c297b1c41f72d713623ef"}
                      resolveUrl={this.props.links[i].soundcloud}
                      onStopTrack={() => console.log('Stopped soundcloud track!')}
                      onReady={() => console.log('Soundcloud track is loaded!')}
                      
                      nr={i}                    
                      addSCDispatchers={this.props.addSCDispatchers}
                    />
                  }
                  
                  <RemoveButton onClick={() => this.props.removeLink(i)}>X</RemoveButton>
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