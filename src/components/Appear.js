import React from 'react'
import { css } from 'react-emotion'
import Transition from 'react-transition-group/Transition'

const transitionStyles = {
  entering: {
    maxHeight: '0px',
  },
  entered: {
    maxHeight: '400px',
  },
  exiting: {
    maxHeight: '0px',
  },
  exited: {
    maxHeight: '0px',
  },
}

export const Appear = ({ children, inProp }) => (
  <Transition
    in={inProp}
    mountOnEnter
    timeout={{ enter: 0, exit: 400 }}
    unmountOnExit
  >
    {state => (
      <div
        className={css`
          max-height: 0px;
          overflow: hidden;
          transition: max-height 400ms linear;
        `}
        style={{
          ...transitionStyles[state],
        }}
      >
        {children}
      </div>
    )}
  </Transition>
)
