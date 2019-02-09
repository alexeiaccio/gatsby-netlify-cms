import posed from 'react-pose'
import { spring, transform } from 'popmotion'

const { pipe, clamp, interpolate } = transform

export const BannerWrapper = posed.div({
  opened: {
    height: 'auto',
  },
  sticked: {
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

export const MenuWrapper = posed.div({
  opened: {
    height: 'auto',
  },
  sticked: {
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

export const StickyHeader = posed.div({
  sticked: {
    applyAtEnd: {
      height: ({ headerHeight, stickedHeight }) => headerHeight - stickedHeight,
      y: 0,
    },
    y: ({ stickedHeight }) => -stickedHeight,
  },
  opened: {
    applyAtStart: { height: 'auto' },
    y: 0,
  },
})

export const TopBlockWrapper = posed.div({
  opened: {
    height: 'auto',
  },
  sticked: {
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
