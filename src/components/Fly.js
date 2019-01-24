import React from 'react'
import { css } from '@emotion/core'
import Transition from 'react-transition-group/Transition'

const transitionStyles = {
  entering: {
    opacity: 1,
    right: '0px',
  },
  entered: {
    opacity: 1,
    right: '-25px',
  },
  exiting: {
    opacity: 1,
    right: '-50px',
  },
  exited: {
    opacity: 0,
    right: '-75px',
  },
}

export const Fly = ({ children, inProp }) => (
  <Transition
    in={inProp}
    mountOnEnter
    timeout={{ enter: 0, exit: 200 }}
    unmountOnExit
  >
    {state => (
      <div
        className={css`
          ${tw(['absolute', 'pin-t'])};
          opacity: 0;
          right: 0px;
          transition: all 200ms ease-in-out;
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
