import posed from 'react-pose'
import { spring, transform } from 'popmotion'

const { pipe, clamp, interpolate } = transform

export const HeightWrapper = posed.div({
  opened: {
    height: 'auto',
  },
  closed: {
    height: 0,
  },
  passive: {
    scaleY: [
      'y',
      pipe(
        interpolate([-200, 0], [0, 1]),
        clamp(0, 1)
      ),
      true,
    ],
  },
})

export const DraggableHeader = posed.header({
  draggable: 'y',
  dragBounds: {
    bottom: 100,
    top: -100,
  },
  dragEnd: {
    transition: ({ from, to, velocity }) =>
      spring({ from, to, velocity, stiffness: 250, damping: 50 }),
  },
})

export const HeaderOpener = posed.button({
  opened: {
    applyAtEnd: { display: 'none' },
    opacity: 0,
  },
  sticked: {
    applyAtStart: { display: 'block' },
    delay: 600,
    opacity: 1,
  },
})

export const LogoWrapper = posed.div({
  opened: {
    applyAtStart: { height: '7rem' },
  },
  sticked: {
    applyAtEnd: { height: 0 },
  },
  passive: {
    scale: [
      'y',
      pipe(
        interpolate([-200, 0], [0, 1]),
        clamp(0, 1)
      ),
      true,
    ],
  },
})

export const LogoMobileWrapper = posed.div({
  opened: {
    applyAtStart: {
      height: '7rem',
      marginBottom: 0,
    },
  },
  sticked: {
    applyAtEnd: {
      height: '3.8rem',
      marginBottom: '-1.05rem',
    },
  },
  passive: {
    scale: [
      'y',
      pipe(
        interpolate([-200, 0], [0, 1]),
        clamp(0, 1)
      ),
      true,
    ],
  },
})

export const StickyHeader = posed.div({
  sticked: {
    applyAtEnd: {
      height: 'auto',
      y: 0,
    },
    y: ({ stickedHeight }) => -stickedHeight,
  },
  opened: {
    applyAtStart: { height: 'auto' },
    y: 0,
  },
})
