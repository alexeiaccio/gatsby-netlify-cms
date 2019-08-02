import React, { Component, memo, createRef } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import { css } from '@emotion/core'

import Content from '../elements/content'
import { ButtonOutlinedBlock, RoundedButtonTemplate } from '../elements/buttons'
import Link from '../elements/link'
import { uuid } from '../../utils'

const wrapperStyles = css`
  ${tw([
    'flex',
    'flex-row',
    'flex-wrap',
    'items-center',
    'justify-between',
    'p-q12',
    'select-none',
    'md:flex-no-wrap',
    'md:px-q24',
  ])};
`

const buttonStyles = css`
  ${tw(['ml-auto', 'mr-q12'])};
`

class Banner extends Component {
  static propTypes = {
    index: PropTypes.objectOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      banners: props.index.data.body.filter(
        ({ primary }) => !primary.expiredate.includes('ago')
      ),
      closed: [],
    }
  }

  handleClose = id => {
    this.setState(({ closed }) => ({ closed: closed.concat(id) }), () => {
      const { banners, closed } = this.state
      closed.lenght === banners.lenght && this.props.onClose()
    })
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
    const { banners, closed } = this.state
    const bannersToShow = banners.filter(
      ({ id }) => !closed.some(x => x === id)
    )

    return (
      <>
        {bannersToShow.slice(0, 1).map(({ id, primary }) => (
          <div css={wrapperStyles} key={uuid()}>
            <Content content={get(primary, 'bannertext.html')} />
            {this.renderButton(primary.bannerlink, primary.bannerbutton)}
            <button
              css={RoundedButtonTemplate}
              onClick={() => this.handleClose(id)}
            >
              ✕
            </button>
          </div>
        ))}
      </>
    )
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
                      __typename
                      ... on PrismicArticles {
                        fields {
                          slug
                        }
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
