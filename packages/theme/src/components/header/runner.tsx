import React from 'react'

interface RunnerProps {
  string: string
  update?: boolean
}

interface RunnerState {
  baseString: string[]
  string: string | null
}

export class Runner extends React.Component<RunnerProps, RunnerState> {
  i: number
  stringRef: any
  interval?: any
  state: RunnerState
  setState: any

  constructor(props) {
    super(props)
    this.i = 0
    this.state = {
      baseString: props.string.split(''),
      string: null,
    }
    this.stringRef = React.createRef()
  }

  componentDidMount() {
    this.setState({ string: this.state.baseString.join('') })
    if (window !== undefined) {
      window.addEventListener('resize', this.getString)
    }
    this.interval = setInterval(this.keyframe, 400)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.state !== prevState) ||
      (this.props.update !== prevProps.update)
    ) {
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
      <span ref={this.stringRef}>
        {this.state.string}
      </span>
    )
  }
}
