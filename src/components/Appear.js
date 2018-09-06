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

const spanStyles = {
  entering: {
    maxHeight: '0px',
  },
  entered: {
    maxHeight: '40px',
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
    timeout={{ enter: 0, exit: 600 }}
    unmountOnExit
  >
    {state => (
      <div
        className={css`
          max-height: 0px;
          overflow: hidden;
          transition: max-height 600ms ease-in-out;
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

export const AppearSpan = ({ children, inProp }) => (
  <Transition
    in={inProp}
    mountOnEnter
    timeout={{ enter: 0, exit: 600 }}
    unmountOnExit
  >
    {state => (
      <span
        className={css`
          display: inline-flex;
          max-height: 0px;
          overflow: hidden;
          transition: max-height 600ms ease-in-out;
        `}
        style={{
          ...spanStyles[state],
        }}
      >
        {children}
      </span>
    )}
  </Transition>
)
