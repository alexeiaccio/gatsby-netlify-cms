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
  BannerWrapper,
  DraggableHeader,
  HeaderOpener,
  LogoWrapper,
  MenuWrapper,
  StickyHeader,
  TopBlockWrapper,
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
    this.handleScrollOut = debounce(this.handleScrollOut, 300)
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
    this.handleResize()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      document !== undefined &&
      this.bannerRef.current &&
      this.headerRef.current &&
      this.logoRef.current &&
      this.menuRef.current &&
      this.topBlockRef.current
      ) {
        const mainContainer = document.getElementById('main-container')
        const bannerHeight = this.bannerRef.current.getBoundingClientRect().height
        const logoHeight = this.logoRef.current.getBoundingClientRect().height
        const menuHeight = this.menuRef.current.getBoundingClientRect().height
        const topBlockHeight = this.topBlockRef.current.getBoundingClientRect()
        .height
        const stickedHeight =
        bannerHeight + logoHeight + menuHeight + topBlockHeight
        const headerHeight = this.headerRef.current.getBoundingClientRect().height
        const {
          headerHeight: headerHeightState,
          stickedHeight: stickedHeightState,
        } = prevState
        
        if (stickedHeightState === null || stickedHeightState !== stickedHeight) {
          this.setState({ stickedHeight })
        }
        
        if (headerHeightState === null) {
          mainContainer.style.paddingTop = `${headerHeight}px`
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
    this.setState({ location: this.props.location.pathname })
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
    const { sticked } = this.state

    if (scroll >= -40 && sticked) {
      this.setState({ sticked: false })
    }
  }

  handleResize = () => {
    if (window !== undefined) {
      this.setState({ screen: window.innerWidth <= 768 ? 'sm' : 'lg' })
    }
  }

  render() {
    const {
      clientY,
      headerHeight,
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
              initialPose={'opened'}
              onDragEnd={this.handleDragEnd}
              onDragStart={this.handleDragStart}
              values={valuesMap}
            >
              <StickyHeader
                css={headerStyles}
                headerHeight={headerHeight}
                pose={sticked ? 'sticked' : 'opened'}
                ref={this.headerRef}
                stickedHeight={stickedHeight}
              >
                {screen === 'lg' && (
                  <>
                    <BannerWrapper
                      css={bannerWrapperStyles}
                      parentValues={valuesMap}
                      pose={sticked ? 'sticked' : 'opened'}
                      ref={this.bannerRef}
                    >
                      <Banner />
                    </BannerWrapper>
                    <TopBlockWrapper
                      css={topBlockWrapperStyles}
                      parentValues={valuesMap}
                      pose={sticked ? 'sticked' : 'opened'}
                      ref={this.topBlockRef}
                    >
                      <TopBlock />
                    </TopBlockWrapper>
                    <LogoWrapper
                      css={logoWrapperStyle}
                      parentValues={valuesMap}
                      pose={sticked ? 'sticked' : 'opened'}
                      ref={this.logoRef}
                    >
                      <div css={logoStyles} />
                    </LogoWrapper>
                    <Title location={location} title={title} />
                    <MenuWrapper
                      css={menuWrapperStyle}
                      parentValues={valuesMap}
                      pose={sticked ? 'sticked' : 'opened'}
                      ref={this.menuRef}
                    >
                      <Menu location={location} />
                    </MenuWrapper>
                  </>
                )}
                <HeaderOpener
                  css={headerOpenerStyles}
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
