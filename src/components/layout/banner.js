import React, { Component, memo, createRef } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import { css } from '@emotion/core'

import Content from '../elements/content'
import { ButtonOutlinedBlock } from '../elements/buttons'
import Link from '../elements/link'
import { uuid } from '../../utils'

const asideStyles = css`
  ${tw(['bg-green', 'block', 'p-q12', 'overflow-hidden', 'w-full'])};
  box-sizing: border-box;
  will-change: height;
`

const wrapperStyles = css`
  ${tw([
    'flex',
    'flex-row',
    'flex-wrap',
    'items-center',
    'justify-between',
    'md:flex-no-wrap',
  ])};
`

const buttonStyles = css`
  ${tw(['ml-auto', 'mr-q12'])};
`

class Banner extends Component {
  static propTypes = {
    index: PropTypes.objectOf(PropTypes.object).isRequired,
    scroll: PropTypes.number,
  }

  static defaultProps = {
    scroll: null,
  }

  constructor(props) {
    super(props)
    this.asideRef = createRef()
    this.state = {
      asideHeight: null,
      banners: props.index.data.body.filter(
        ({ primary }) => !primary.expiredate.includes('ago')
      ),
      closed: [],
    }
  }

  componentDidMount() {
    if (this.asideRef.current && this.state.asideHeight === null) {
      this.setState({
        asideHeight: this.asideRef.current.getBoundingClientRect().height,
      })
    }
  }

  handleClose = id => {
    this.setState(({ closed }) => ({ closed: closed.concat(id) }))
  }

  renderButton(link, text) {
    const isDocument = get(link, 'document')
    const LinkButton = isDocument
      ? ButtonOutlinedBlock.withComponent(Link)
      : ButtonOutlinedBlock.withComponent('a')

    return isDocument ? (
      <LinkButton
        css={buttonStyles}
        target={get(link, 'target')}
        to={get(link, 'document[0].fields.slug', '/')}
      >
        {text}
      </LinkButton>
    ) : (
      <LinkButton
        css={buttonStyles}
        href={get(link, 'url')}
        target={get(link, 'target')}
      >
        {text}
      </LinkButton>
    )
  }

  render() {
    const { asideHeight, banners, closed } = this.state
      const { scroll } = this.props
    const bannersToShow = banners.filter(
      ({ id }) => !closed.some(x => x === id)
    )
    const minusScroll = num =>
      `${num + scroll < 0 ? 0 : num + scroll >= num ? num : num + scroll}px`

    return scroll !== null && bannersToShow.length ? (
      <aside
        css={css`
          ${asideStyles};
          height: ${minusScroll(asideHeight)};
        `}
        ref={this.asideRef}
      >
        {bannersToShow.slice(0, 1).map(({ id, primary }) => (
          <div css={wrapperStyles} key={uuid()}>
            <Content content={get(primary, 'bannertext.html')} />
            {this.renderButton(primary.bannerlink, primary.bannerbutton)}
            <ButtonOutlinedBlock onClick={() => this.handleClose(id)}>
              ✕
            </ButtonOutlinedBlock>
          </div>
        ))}
      </aside>
    ) : null
  }
}

function WithStaticQuery(props) {
  return (
    <StaticQuery
      query={graphql`
        query BannerQuery {
          index: prismicIndex {
            data {
              body {
                id
                primary {
                  bannertext {
                    html
                  }
                  bannerbutton
                  bannerlink {
                    document {
                      fields {
                        slug
                      }
                    }
                    url
                    target
                  }
                  expiredate(fromNow: true)
                }
              }
            }
          }
        }
      `}
      render={({ index }) => <Banner index={index} {...props} />}
    />
  )
}

export default memo(WithStaticQuery)
