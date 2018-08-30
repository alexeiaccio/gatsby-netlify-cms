/* global tw */
import React, { Component, createRef } from 'react'
import { css } from 'react-emotion'

class RunningString extends Component {
  constructor(props) {
    super(props)
    this.state = {
      baseString: props.string.split(''),
      string: props.string.split(''),
    }
    this.stringRef = createRef()
  }

  componentDidMount() {
    const stringNode = this.stringRef.current
    const stringNodeWidth = stringNode.offsetWidth
    const windowWidth = window.innerWidth
    stringNodeWidth < windowWidth &&
      this.setState({
        string: this.state.string
          .concat(this.state.baseString)
          .concat(this.state.baseString)
          .concat(this.state.baseString),
      })

    const intervalId = setInterval(this.keyframe, 400)
    this.setState({
      intervalId: intervalId,
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  keyframe = () => {
    this.setState({
      string: this.state.string.concat(this.state.string[0]).slice(1),
    })
  }

  render() {
    return (
      <span
        className={css`
          ${tw(['whitespace-no-wrap'])};
        `}
        ref={this.stringRef}
      >
        {this.state.string}
      </span>
    )
  }
}

export default RunningString
