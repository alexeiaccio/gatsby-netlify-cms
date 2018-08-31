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
    maxHeight: '200px',
  },
  exited: {
    maxHeight: '0px',
  },
}

export const Appear = ({ children, inProp }) => (
  <Transition in={inProp} timeout={0}>
    {state => (
      <div
        className={css`
          max-height: 0px;
          overflow: hidden;
          transition: max-height 500ms ease-out;
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
