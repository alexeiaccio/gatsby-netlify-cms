import React, { memo, Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
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
    'overflow-hidden',
    'w-full',
  ])};
  transition: margin 16ms;
`

const logoStyles = css`
  ${tw(['bg-center', 'bg-contain', 'bg-no-repeat'])};
  background-image: url(${logo});
  height: 30px;
  transform: rotateZ(90deg);
  width: 60px;
`

const navStyles = css`
  ${tw([
    'flex',
    'flex-row',
    'justify-center',
    'mt-q8',
    'w-full',
    'sm:justify-between',
  ])};
  transition: margin 16ms;
`

const Title = styled.span`
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
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor() {
    super()
    this.state = {
      location: null,
      screen: null,
      scroll: 0,
      string:
        '· культура · ревью · аналитика · петербург · искусство · вовлеченность · активизм ',
      title: '·К·Р·А·П·И·В·А·',
    }
  }

  componentDidMount() {
    if (window !== undefined) {
      window.addEventListener('scroll', this.handleScroll)
    }
    this.handleLocation()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.handleLocation()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleLocation = () => {
    this.setState({ location: this.props.location.pathname })
  }

  handleScroll = e => {
    if (e.pageY < 100) {
      this.setState({ scroll: e.pageY })
    } else {
      this.setState({ scroll: null })
    }
  }

  render() {
    const { location, scroll, string, title } = this.state
    const LinkOrSpan =
      location && location === '/' ? Title : Title.withComponent(Link)
    const minusScroll = num => `${num - scroll > 0 ? num - scroll : 0}px`

    return (
      <header css={headerStyles}>
        {scroll !== null && (
          <div
            css={css`
              ${logoWrapperStyle};
              height: ${location === '/' ? minusScroll(60) : 0};
              margin-bottom: ${location === '/' ? minusScroll(16) : 0};
              margin-top: ${location === '/' ? minusScroll(72) : 0};
              transition: height ${location === '/' ? 400 : 16}ms ease-out;
            `}
          >
            <div css={logoStyles} />
          </div>
        )}
        <nav
          css={css`
            ${navStyles};
            margin-bottom: ${scroll !== null && location === '/'
              ? minusScroll(16)
              : 0};
          `}
        >
          <LinkOrSpan to="/">{title}</LinkOrSpan>
        </nav>
        <RunningString string={string} />
      </header>
    )
  }
}

function WithLocation() {
  return <Location>{({ location }) => <Header location={location} />}</Location>
}

export default memo(WithLocation)
