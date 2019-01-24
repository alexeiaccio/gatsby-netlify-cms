import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

class RunningString extends Component {
  constructor(props) {
    super(props)
    this.state = {
      baseString: props.string.split(''),
      string: props.string.split(''),
    }
  }

  componentDidMount() {
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
        css={css`
          ${tw(['whitespace-no-wrap'])};
        `}
      >
        {this.state.string}
      </span>
    )
  }
}

export default RunningString
