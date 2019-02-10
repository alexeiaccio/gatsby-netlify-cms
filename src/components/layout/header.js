import React, { memo, Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { Location } from '@reach/router'
import { value } from 'popmotion'
import { css } from '@emotion/core'
import debounce from 'lodash/debounce'
import get from 'lodash/get'

import Banner from './banner'
import Title from './title'
import Menu from './menu'
import RunningString from './running-string'
import TopBlock from './top-block'
import {
  HeightWrapper,
  DraggableHeader,
  HeaderOpener,
  LogoWrapper,
  LogoMobileWrapper,
  StickyHeader,
} from './posed'
import {
  bannerWrapperStyles,
  headerWrapperStyles,
  headerStyles,
  headerOpenerStyles,
  logoWrapperStyle,
  logoStyles,
  menuWrapperStyle,
  topBlockWrapperStyles,
} from './styles'

class Header extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor() {
    super()
    this.bannerRef = createRef()
    this.headerRef = React.createRef()
    this.logoRef = createRef()
    this.menuRef = createRef()
    this.topBlockRef = createRef()
    this.handleScrollOut = debounce(this.handleScrollOut, 400)
    this.handleHeaderChange = debounce(this.handleHeaderChange, 600)
    this.state = {
      clientY: null,
      headerHeight: null,
      location: null,
      screen: null,
      sticked: false,
      stickedHeight: null,
      string:
        '· культура · ревью · аналитика · петербург · искусство · вовлеченность · активизм ',
      title: '·К·Р·А·П·И·В·А·',
    }
    this.y = value(0)
  }

  componentDidMount() {
    if (window !== undefined) {
      window.addEventListener('scroll', this.handleScrollIn)
      window.addEventListener('scroll', this.handleScrollOut)
      window.addEventListener('resize', this.handleResize)
    }
    this.handleLocation()
    this.handleHeaderChange()
    this.handleResize()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.handleLocation()
      this.handleHeaderChange()
    }
    if (document !== undefined) {
      const bannerHeight = this.bannerRef.current
        ? this.bannerRef.current.getBoundingClientRect().height
        : 0
      const logoHeight = this.logoRef.current
        ? this.logoRef.current.getBoundingClientRect().height
        : 0
      const menuHeight = this.menuRef.current
        ? this.menuRef.current.getBoundingClientRect().height
        : 0
      const topBlockHeight = this.topBlockRef.current
        ? this.topBlockRef.current.getBoundingClientRect().height
        : 0
      const stickedHeight =
        bannerHeight + logoHeight + menuHeight + topBlockHeight
      const headerHeight = this.headerRef.current
        ? this.headerRef.current.getBoundingClientRect().height
        : 0
      const {
        headerHeight: headerHeightState,
        stickedHeight: stickedHeightState,
      } = prevState

      if (stickedHeightState === null || stickedHeightState !== stickedHeight) {
        this.setState({ stickedHeight })
      }

      if (headerHeightState !== headerHeight) {
        this.setState({ headerHeight })
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollIn)
    window.removeEventListener('scroll', this.handleScrollOut)
    window.removeEventListener('resize', this.handleResize)
    this.handleScrollOut.cancel()
  }

  handleDragStart = e => {
    const { clientY } = get(e, ['touches', 0], e)
    this.setState({ clientY })
  }

  handleDragEnd = e => {
    const { clientY: oldClientY, sticked } = this.state
    const { clientY: newClientY } = get(e, ['changedTouches', 0], e)

    if (!sticked && newClientY - oldClientY < -30) {
      this.setState({ sticked: true })
    } else if (sticked && newClientY - oldClientY > 30) {
      this.setState({ sticked: false })
    }
    this.setState({ clientY: null })
  }

  handleOpen = () => {
    this.setState({ sticked: false })
  }

  handleLocation = () => {
    const location = get(this.props, 'location.pathname')
    this.setState({
      location,
      sticked: location !== '/',
    })
  }

  handleScrollIn = e => {
    const mainContainer = e.target.getElementById('main-container')
    const scroll = mainContainer.getBoundingClientRect().top
    const { sticked } = this.state

    if (scroll < -40 && !sticked) {
      this.setState({ sticked: true })
    }
  }

  handleScrollOut = e => {
    const mainContainer = e.target.getElementById('main-container')
    const scroll = mainContainer.getBoundingClientRect().top
    const { location, sticked } = this.state

    if (scroll >= -40 && sticked && location === '/') {
      this.setState({ sticked: false }, this.handleHeaderChange)
    }
  }

  handleHeaderChange = () => {
    if (document !== undefined && this.headerRef.current) {
      const mainContainer = document.getElementById('main-container')
      const headerHeight = this.headerRef.current.getBoundingClientRect().height
      mainContainer.style.paddingTop = `${headerHeight}px`
    }
  }

  handleResize = () => {
    if (window !== undefined) {
      this.setState({ screen: window.innerWidth <= 768 ? 'sm' : 'lg' })
    }
  }

  handleScrollToTop = () => {
    if (window !== undefined) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  render() {
    const {
      clientY,
      location,
      screen,
      sticked,
      stickedHeight,
      string,
      title,
    } = this.state
    const valuesMap = { y: this.y }

    return (
      <>
        {screen !== null ? (
          <>
            <DraggableHeader
              css={css`
                ${headerWrapperStyles};
                cursor: ${clientY ? 'grabbing' : 'grab'};
              `}
              onDragEnd={this.handleDragEnd}
              onDragStart={this.handleDragStart}
              values={valuesMap}
            >
              <StickyHeader
                css={headerStyles}
                pose={sticked ? 'sticked' : 'opened'}
                ref={this.headerRef}
                stickedHeight={stickedHeight}
              >
                <HeightWrapper
                  css={bannerWrapperStyles}
                  parentValues={valuesMap}
                  pose={sticked ? 'closed' : 'opened'}
                  ref={this.bannerRef}
                >
                  <Banner onClose={this.handleHeaderChange} />
                </HeightWrapper>
                {screen === 'lg' && (
                  <HeightWrapper
                    css={topBlockWrapperStyles}
                    parentValues={valuesMap}
                    pose={sticked ? 'closed' : 'opened'}
                    ref={this.topBlockRef}
                  >
                    <TopBlock />
                  </HeightWrapper>
                )}
                {screen === 'lg' && (
                  <LogoWrapper
                    css={logoWrapperStyle}
                    parentValues={valuesMap}
                    pose={sticked ? 'sticked' : 'opened'}
                    ref={this.logoRef}
                  >
                    <div css={logoStyles} />
                  </LogoWrapper>
                )}
                {screen === 'sm' && (
                  <LogoMobileWrapper
                    css={logoWrapperStyle}
                    onClick={this.handleScrollToTop}
                    parentValues={valuesMap}
                    pose={sticked ? 'sticked' : 'opened'}
                    ref={this.logoRef}
                  >
                    <div css={logoStyles} />
                  </LogoMobileWrapper>
                )}
                {screen === 'lg' && (
                  <Title
                    handleClick={this.handleScrollToTop}
                    location={location}
                    title={title}
                  />
                )}
                {screen === 'sm' && (
                  <HeightWrapper
                    css={css`
                      ${tw(['overflow-hidden'])};
                    `}
                    pose={sticked ? 'closed' : 'opened'}
                  >
                    <Title location={location} title={title} />
                  </HeightWrapper>
                )}
                <HeightWrapper
                  css={menuWrapperStyle}
                  parentValues={valuesMap}
                  pose={sticked ? 'closed' : 'opened'}
                  ref={this.menuRef}
                >
                  <Menu location={location} />
                </HeightWrapper>
                {screen === 'sm' && (
                  <HeightWrapper
                    css={topBlockWrapperStyles}
                    parentValues={valuesMap}
                    pose={sticked ? 'closed' : 'opened'}
                    ref={this.topBlockRef}
                  >
                    <TopBlock />
                  </HeightWrapper>
                )}
                <HeaderOpener
                  css={headerOpenerStyles}
                  pose={sticked ? 'closed' : 'opened'}
                  onClick={this.handleOpen}
                >
                  Открыть
                </HeaderOpener>
                <RunningString string={string} />
              </StickyHeader>
            </DraggableHeader>
          </>
        ) : null}
      </>
    )
  }
}

function WithLocation() {
  return <Location>{({ location }) => <Header location={location} />}</Location>
}

export default memo(WithLocation)
