import React, { memo, Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Location } from '@reach/router'

import Banner from './banner'
import LogoTitle from './logo-title'
// import Menu from './menu'
import RunningString from './running-string'
import TopBlock from './top-block'

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

class Header extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor() {
    super()
    this.headerRef = createRef()
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
      window.addEventListener('resize', this.handleResize)
    }
    this.handleLocation()
    this.handleResize()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.handleLocation()
    }
    if (document !== undefined && this.headerRef.current) {
      const mainContainer = document.getElementById('main-container')
      const headerHeight = this.headerRef.current.getBoundingClientRect().height
      if (mainContainer.style.paddingTop !== headerHeight) {
        mainContainer.style.cssText = `padding-top: ${headerHeight}px`
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }

  handleLocation = () => {
    this.setState({ location: this.props.location.pathname })
  }

  handleScroll = e => {
    const mainContainer = e.target.getElementById('main-container')
    const scroll = mainContainer.getBoundingClientRect().top

    if (scroll > -100) {
      this.setState({ scroll })
    } else {
      this.setState({ scroll: null })
    }

    if (this.headerRef.current) {
    const headerHeight = this.headerRef.current.getBoundingClientRect().height
      if (mainContainer.style.paddingTop !== headerHeight) {
        mainContainer.style.cssText = `padding-top: ${headerHeight + 36}px`
      }
    }
  }

  handleResize = () => {
    if (window !== undefined) {
      this.setState({ screen: window.innerWidth <= 768 ? 'sm' : 'lg' })
    }
  }

  render() {
    const { location, scroll, screen, string, title } = this.state

    return (
      <>
        {screen !== null ? (
          <header css={headerStyles} ref={this.headerRef}>
            <Banner scroll={scroll} />
            {screen === 'lg' && (
              <>
                <TopBlock scroll={scroll} />
                <LogoTitle location={location} scroll={scroll} title={title} />
                {/* <Menu location={location} scroll={scroll} /> */}
              </>
            )}
            <RunningString string={string} />
          </header>
        ) : null}
      </>
    )
  }
}

function WithLocation() {
  return <Location>{({ location }) => <Header location={location} />}</Location>
}

export default memo(WithLocation)
