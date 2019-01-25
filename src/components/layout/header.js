import React, { memo, Component } from 'react'
import { css } from '@emotion/core'
import { Location } from '@reach/router'

import Link from '../elements/link'
import RunningString from './running-string'
import logo from '../../img/logo.svg'

const headerStyles = css`
  ${tw([
    'bg-black',
    'fixed',
    'overflow-hidden',
    'pin-l',
    'pin-r',
    'pin-t',
    'z-1001',
  ])};
`

const logoWrapperStyle = css`
  ${tw([
    'flex',
    'flex-row',
    'items-center',
    'justify-center',
    'mt-q8',
    'overflow-hidden',
    'w-full',
  ])};
  transition: height 400ms ease-out;
  transition: margin 200ms;
`

const logoStyles = css`
  ${tw(['bg-center', 'bg-contain', 'bg-no-repeat'])};
  background-image: url(${logo});
  height: 30px;
  transform: rotateZ(90deg);
  width: 60px;
`

const navStyles = css`
  ${tw(['flex', 'flex-row', 'justify-center', 'w-full', 'sm:justify-between'])};
  transition: margin 200ms;
`

const titleStyles = css`
  ${tw([
    'inline-block',
    'font-extrabold',
    'font-montserrat',
    'mx-auto',
    'px-q12',
    'pt-q8',
    'select-none',
    'text-white',
    'text-mobile',
    'hover:text-green',
    'sm:pt-0',
    'sm:text-heading5',
  ])};
  letter-spacing: 0.3em;
  line-height: 1.45;
`

class Header extends Component {
  constructor() {
    super()
    this.state = {
      location: null,
      screen: null,
      sticked: false,
    }
  }

  componentDidMount() {
    this.handleLocation()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.handleLocation()
    }
  }

  handleLocation = () => {
    this.setState({ location: this.props.location.pathname })
  }

  render() {
    const { location } = this.state

    return (
      <header css={headerStyles}>
        <div
          css={css`
            ${logoWrapperStyle};
            ${location === '/' && tw(['mb-q24', 'mt-q72'])};
            height: ${location === '/' ? '60px' : 0};
          `}
        >
          <div css={logoStyles} />
        </div>
        <nav
          css={css`
            ${navStyles};
            ${location === '/' && tw(['mb-q16'])};
          `}
        >
          {location && location === '/' ? (
            <span css={titleStyles}>·К·Р·А·П·И·В·А·</span>
          ) : (
            <Link css={titleStyles} to="/">
              ·К·Р·А·П·И·В·А·
            </Link>
          )}
        </nav>
        <RunningString string="· культура · ревью · аналитика · петербург · искусство · вовлеченность · активизм " />
      </header>
    )
  }
}

function WithLocation() {
  return <Location>{({ location }) => <Header location={location} />}</Location>
}

export default memo(WithLocation)
