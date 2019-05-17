import React, { memo, Fragment, Component } from 'react'
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
    'py-q12',
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
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    pages: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  render() {
    const { index, pages, location } = this.props
    const pathname = get(location, 'pathname')
    const LinkOrMove =
      pathname && pathname === '/'
        ? ButtonOutlinedBlock
        : ButtonOutlinedBlock.withComponent(Link)

    const handleClick = link => {
      if (document !== undefined && window !== undefined) {
        const headerHeight = get(
          document.getElementById('main-container'),
          'style.paddingTop'
        )
        const top =
          get(document.getElementById(link), 'offsetTop') +
          parseInt(headerHeight)
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }

    const firstCategory =
      pathname === '/' ? [] : [{ categorytitle: { text: 'Новое' } }]
    const preparedCategories = firstCategory
      .concat({ categorytitle: { text: 'Афиша' } })
      .concat(index.data.categories)
      .concat({ categorytitle: { text: 'О нас' } })

    return (
      <nav css={navStyles}>
        {preparedCategories.map(category => {
          const link = translite(category.categorytitle.text)
          const pageExist = pages.edges.some(
            ({ node }) => node.path.replace(/\//g, '') === link
          )

          return (
            <Fragment key={uuid()}>
              {pathname === '/' ? (
                <LinkOrMove css={linkStyles} onClick={() => handleClick(link)}>
                  {category.categorytitle.text}
                </LinkOrMove>
              ) : pageExist ? (
                <LinkOrMove
                  api={index.href}
                  css={linkStyles}
                  location={location}
                  to={link}
                >
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
            href
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
