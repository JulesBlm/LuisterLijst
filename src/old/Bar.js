import React, { Component } from 'react'
import YouTube from 'react-youtube';
import { Spring } from 'react-spring'
import { Gesture } from 'react-with-gesture'

class Bar extends Component {

    componentDidMount() {
        console.log("mounted");
        //API stuff here
        //get name, duration from this.props.link
    }

    render() {
        <div className="bar">
            {this.props.index}
        </div>

    }
}