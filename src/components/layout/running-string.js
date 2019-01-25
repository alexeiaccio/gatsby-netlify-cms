import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

class RunningString extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    string: PropTypes.string.isRequired,
  }

  static defaultProps = {
    onClick: null,
  }

  constructor(props) {
    super(props)
    this.i = 0
    this.state = {
      baseString: props.string.split(''),
      string: null,
    }
    this.stringRef = createRef()
  }

  componentDidMount() {
    this.setState({ string: this.state.baseString.join('') })
    if (window !== undefined) {
      window.addEventListener('resize', this.getString)
    }
    this.interval = setInterval(this.keyframe, 400)
  }

  componentDidUpdate(_, prevState) {
    if (this.state !== prevState) {
      this.getString()
    }
  }

  componentWillUnmount() {
    if (window !== undefined) {
      window.removeEventListener('resize', this.getString)
    }
    clearInterval(this.interval)
  }

  keyframe = () => {
    const stringTag = this.stringRef.current
    const newStringInnerText = stringTag.innerText
      .split('')
      .slice(1)
      .concat(this.state.baseString[this.i % this.state.baseString.length])
    stringTag.innerText = newStringInnerText.join('')
    this.i += 1
  }

  getString = () => {
    const stringTag = this.stringRef.current
    const stringWidth = stringTag.getBoundingClientRect().width
    const parentWidth = stringTag.parentNode.getBoundingClientRect().width
    if (stringWidth < parentWidth) {
      stringTag.innerText += this.state.baseString[
        this.i % this.state.baseString.length
      ]
      this.i += 1
      this.getString()
    }
  }

  render() {
    return (
      <div
        css={css`
          ${tw([
            'cursor-pointer',
            'font-semibold',
            'font-montserrat',
            'overflow-hidden',
            'text-black',
            'text-center',
            'text-green-dark',
            'text-xs',
            'md:text-md',
            'tracking-wide',
          ])};
          line-height: 2;
          font-variant-caps: all-small-caps;
        `}
        onClick={this.props.onClick}
      >
        <span
          css={css`
            ${tw(['whitespace-no-wrap'])};
          `}
          ref={this.stringRef}
        >
          {this.state.string}
        </span>
      </div>
    )
  }
}

export default RunningString
