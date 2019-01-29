import React, { memo, Fragment, Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import get from 'lodash/get'

import {
  ButtonOutlinedBlock,
  ButtonOutlinedDisabled,
} from '../elements/buttons'
import Link from '../elements/link'
import { translite } from '../../utils/makePath'
import { uuid } from '../../utils'

const navStyles = css`
  ${tw([
    'flex',
    'flex-row',
    'flex-wrap',
    'items-center',
    'justify-center',
    'max-w-md',
    'mx-auto',
    'overflow-hidden',
    'py-q24',
  ])};
  box-sizing: border-box;
  will-change: height;
`

const linkStyles = css`
  ${tw([
    'flex-no-shrink',
    'flex-grow',
    'px-q8',
    'hover:bg-green',
    'md:w-auto',
  ])};
`

class Menu extends Component {
  static propTypes = {
    index: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.string.isRequired,
    pages: PropTypes.objectOf(PropTypes.any).isRequired,
    scroll: PropTypes.number,
  }

  static defaultProps = {
    scroll: null,
  }

  constructor() {
    super()
    this.navRef = createRef()
    this.state = {
      navHeight: null,
    }
  }

  componentDidMount() {
    if (this.state.navHeight === null && this.navRef.current) {
      this.setState({
        navHeight: this.navRef.current.getBoundingClientRect().height,
      })
    }
  }

  render() {
    const { index, pages, location, scroll } = this.props
    const { navHeight } = this.state
    const LinkOrMove =
      location && location === '/'
        ? ButtonOutlinedBlock
        : ButtonOutlinedBlock.withComponent(Link)

    const handleClick = link => {
      if (document !== undefined && window !== undefined) {
        const top = get(document.getElementById(link), 'offsetTop')
        window.scrollTo({ top, behavior: 'smooth' })
        setTimeout(() => {
          const nextTop = get(document.getElementById(link), 'offsetTop')
          window.scrollTo({ top: nextTop, behavior: 'smooth' })
        }, 200)
      }
    }

    const minusScroll = num =>
      `${num + scroll < 0 ? 0 : num + scroll >= num ? num : num + scroll}px`

    if (scroll === null) return null

    const firstCategory =
      location === '/' ? [] : [{ categorytitle: { text: 'Новое' } }]
    const preparedCategories = firstCategory
      .concat({ categorytitle: { text: 'Афиша' } })
      .concat(index.data.categories)
      .concat({ categorytitle: { text: 'О нас' } })

    return (
      <nav
        css={css`
          ${navStyles};
          height: ${minusScroll(navHeight)};
        `}
        ref={this.navRef}
      >
        {preparedCategories.map(category => {
          const link = translite(category.categorytitle.text)
          const pageExist = pages.edges.some(
            ({ node }) => node.path.replace(/\//g, '') === link
          )

          return (
            <Fragment key={uuid()}>
              {location === '/' ? (
                <LinkOrMove css={linkStyles} onClick={() => handleClick(link)}>
                  {category.categorytitle.text}
                </LinkOrMove>
              ) : pageExist ? (
                <LinkOrMove css={linkStyles} to={link}>
                  {category.categorytitle.text}
                </LinkOrMove>
              ) : (
                <ButtonOutlinedDisabled
                  css={css`
                    ${tw(['flex-no-shrink', 'flex-grow', 'px-q8'])};
                  `}
                >
                  {category.categorytitle.text}
                </ButtonOutlinedDisabled>
              )}
            </Fragment>
          )
        })}
      </nav>
    )
  }
}

function WithStaticQuery(props) {
  return (
    <StaticQuery
      query={graphql`
        query MenuQuery {
          index: prismicIndex {
            data {
              categories {
                categorytitle {
                  text
                }
              }
            }
          }
          pages: allSitePage {
            edges {
              node {
                path
              }
            }
          }
        }
      `}
      render={({ index, pages }) => (
        <Menu index={index} pages={pages} {...props} />
      )}
    />
  )
}

export default memo(WithStaticQuery)
