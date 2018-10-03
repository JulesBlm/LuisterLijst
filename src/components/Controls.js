import React, { Component } from 'react';
import styled from 'styled-components';

const StyledControls = styled.div`
    display: flex;
    justify-content: space-between;    
    text-align: center;
    width: var(--bar-width);
    height: 90px;
    overflow: visible;
    pointer-events: auto;
    line-height: 45px;
    border-radius: 4px;
    color: rgb(153, 153, 153);
    font-weight: 400;
    background-color: rgb(255, 255, 255);
    box-sizing: border-box;
`;

const ControlButton = styled.button`
    border: none;
    font-size: 40px;
    cursor: pointer;
    padding: 20px;
    border: 0px;
    border-radius: 2px;
    background-color: white;

    &:hover {
        background-color: #DFF2F2;
    }

    &:hover path {
        fill: #ff8364;
    }

    &:focus, &:active {
        outline: none;
    }
      
    &:active {
        background-color: #9BC0EF;
    }
`;

class Controls extends Component {

    render() {
        return (
            <StyledControls>
                {/*<button 
                    onClick={this.props.previousControl}
                    className="button controlButton">

                </button>*/}
                <ControlButton
                    onClick={this.props.pauseControl}
                >
<svg width="50" height="50" viewBox="0 0 191.413 191.413">
      <path d="M34.802,0C15.661,0,0,15.661,0,34.802v121.808c0,19.141,15.661,34.802,34.802,34.802s34.802-15.661,34.802-34.802V34.802    C69.605,15.661,53.944,0,34.802,0z M52.204,156.611c0,10.441-6.96,17.401-17.401,17.401s-17.401-6.96-17.401-17.401V34.802    c0-10.441,6.96-17.401,17.401-17.401s17.401,6.96,17.401,17.401V156.611z"/>
      <path d="M156.611,0c-19.141,0-34.802,15.661-34.802,34.802v121.808c0,19.141,15.661,34.802,34.802,34.802    s34.802-15.661,34.802-34.802V34.802C191.413,15.661,175.752,0,156.611,0z M174.012,156.611c0,10.441-6.96,17.401-17.401,17.401    s-17.401-6.96-17.401-17.401V34.802c0-10.441,6.96-17.401,17.401-17.401s17.401,6.96,17.401,17.401V156.611z"/>
</svg>

                </ControlButton>
                <ControlButton
                    onClick={this.props.playControl} 
                    className="button controlButton"
                >
                    <svg width="50" height="50" viewBox="0 0 41.999 41.999">
                        <path d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40
                        c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20
                        c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z M7.5,39.095V2.904l26.239,18.096L7.5,39.095z"/>
                    </svg>

                </ControlButton>
                {/*<button
                    onClick={this.props.nextControl}
                    className="button controlButton"
                >
                    ⏩
                </button>*/}
            </StyledControls>
        )
    }
}

export default Controls;